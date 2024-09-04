import cv2
import numpy as np
from skimage import io
from sklearn.cluster import KMeans
import time
import pandas as pd
import os

# 只需更改这里的参数
k = 12
#读取的文件夹目录
path = './pooling result/theme'
# 存储方案图片的文件夹路径
img_store_path = './scheme img/theme'
# 存储表格的文件夹路径
table_store_path = './tables/theme'
#----------------------------------------------------------------------------------

# 创建空的DataFrame对象准备存储方案
def columns_func(color_num):
    column = ['scheme_name','label']
    for i in range(1,color_num+1):
        for j in ['R','G','B']:
            column.append('color' + str(i) + '-' + j)
    return column

colors_df = pd.DataFrame(columns=columns_func(k))


#得到文件夹下所有文件的名称
files = os.listdir(path)

# 方案数目，用于编制索引
scheme_num = 0

#遍历文件夹
for file in files:

    # 图片名称提取
    img_name = file.split('.')[0]
    # 图片主题提取
    theme_label = file.split('_')[0]

    # print(file)   # 输出的是文件名称，是字符串类型数据
    print('正在处理：',file)
    img_path = path + '\\' + file
    # print(img_path)
    img = cv2.imread(img_path)
    #有一些图片虽然被我们改为了jpg后缀且不影响查看，但实际上很有可能不是这类的图片，imread读取会返回None
    if img is not None:
        # 开始计时
        start = time.perf_counter()
        ##############################################################################

        # img.shape  # (高, 长, 通道数)  三通道顺序：BGR

        # BGR通道转换为RGB
        imgrgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # RGB转换为HSV
        imghsv = cv2.cvtColor(imgrgb, cv2.COLOR_RGB2HSV)

        # 转换数据维度
        imgrgb1 = imgrgb.reshape((imgrgb.shape[0] * imgrgb.shape[1], imgrgb.shape[2]))
        imghsv1 = imghsv.reshape((imghsv.shape[0] * imghsv.shape[1], imghsv.shape[2]))

        # ndarray对象转换为DataFrame
        dfrgb = pd.DataFrame(imgrgb1, columns=['R', 'G', 'B'], index=range(0, imgrgb1.shape[0]))
        dfhsv = pd.DataFrame(imghsv1, columns=['H', 'S', 'V'], index=range(0, imghsv1.shape[0]))
        # dfcolor:所有像素点颜色的Dataframe对象
        dfcolor = pd.concat([dfrgb, dfhsv], axis=1)
        # dfcolor_clear：去除重复数据并按色相H排序
        dfcolor_clear = (dfcolor.drop_duplicates(keep='first')).sort_values(by=['H', 'S', 'V'], ascending=True)
        # 只有颜色大于k种才能聚类，某种程度上筛选掉一些简笔黑白画
        if dfcolor_clear.shape[0] >= k:

            # 等距取初始点
            step = int(dfcolor_clear.shape[0] / k ) # int()向下取整
            dfcolor_initial = dfcolor_clear.iloc[dfcolor_clear.shape[0] % k::step]
            # dfcolor_initial
            rgb_initial = np.array(dfcolor_initial.loc[:, ['R', 'G', 'B']])

            # K-means聚类
            # 聚类个数k之前已定义
            # 构造聚类器
            estimator = KMeans(n_clusters=k, max_iter=4000, init=rgb_initial, n_init=1)
            # 聚类
            estimator.fit(imgrgb1)
            # 获取聚类中心
            centroids = estimator.cluster_centers_

            # 色彩排序
            main_colors_rgb = np.uint8([centroids])
            main_colors_hsv = cv2.cvtColor(main_colors_rgb, cv2.COLOR_RGB2HSV)

            # 转换数据维度
            main_colors_rgb1 = main_colors_rgb.reshape(
                (main_colors_rgb.shape[0] * main_colors_rgb.shape[1], main_colors_rgb.shape[2]))
            main_colors_hsv1 = main_colors_hsv.reshape(
                (main_colors_hsv.shape[0] * main_colors_hsv.shape[1], main_colors_hsv.shape[2]))

            df_main_colors_rgb = pd.DataFrame(main_colors_rgb1, columns=['R', 'G', 'B'],
                                              index=range(0, main_colors_rgb1.shape[0]))
            df_main_colors_hsv = pd.DataFrame(main_colors_hsv1, columns=['H', 'S', 'V'],
                                              index=range(0, main_colors_hsv1.shape[0]))

            df_main_colors = pd.concat([df_main_colors_rgb, df_main_colors_hsv], axis=1)
            df_main_colors.columns = ['R', 'G', 'B', 'H', 'S', 'V']

            # 生成图片
            # 方案标号
            scheme_name = img_name   # 方案名即图片名

            scheme_V = df_main_colors.sort_values(by=['V', 'S', 'H'], ascending=True)  # 以明度为主排列（事实证明更好看一点）

            scheme_rgb_df = scheme_V.loc[:, ['R', 'G', 'B']]
            scheme_rgb = np.array(scheme_V.loc[:, ['R', 'G', 'B']])

            # 方案存储进表格中
            temp_list = [scheme_name,theme_label]
            # 取出方案DataFrame的每一行，转换为列表
            for index in range(0,k):
                line = np.array(scheme_rgb_df.iloc[index,:])
                temp_list.extend(line.tolist())

            temp_df = pd.DataFrame(columns=columns_func(k),index=[scheme_num],data=[temp_list])
            colors_df = colors_df.append(temp_df)

            # 输出配色方案图片（测试的时候可以有，批处理的时候可以不用）
            # 使用算法跑出的中心点，生成一个矩阵，为数据可视化做准备
            result = []
            result_width = 200
            result_height_per_center = 80

            # 获取图片色彩层数
            n_channels = imgrgb1.shape[1]

            for center_index in range(k):
                result.append(
                    np.full((result_width * result_height_per_center, n_channels), scheme_rgb[center_index],dtype=int))

            result = np.array(result)
            result = result.reshape((result_height_per_center * k, result_width, n_channels))
            result = result.astype(np.uint8)

            # 保存图片
            io.imsave(
                img_store_path + '/' + scheme_name + '.jpg',
                result)

        scheme_num += 1
        #####################################################################################
        end = time.perf_counter()
        print("运算时间为:", end - start, 'seconds')

colors_df.to_excel(table_store_path + '/' + '12_scheme.xlsx',index=False)

print('进程完毕')