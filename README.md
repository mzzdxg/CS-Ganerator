# CS-Ganerator
Project Introduction: In this project, a framework called CS-Ganerator is proposed, which investigates the automatic generation of color schemes for web interface design by integrating both knowledge and data. Initially, an improved K-Means clustering algorithm is used to extract color scheme instances from a large image dataset with diverse themes. Subsequently, a Conditional Generative Adversarial Network augmented with knowledge modules is employed to discern the underlying color and thematic relationships under aesthetic principles, enabling the generation of thematic color schemes. 

"1-Color Extraction.py":
Image Color Scheme Extraction Program
"2-Color Scheme Dataset":
The extracted color scheme dataset, "full-data.xlsx" is the complete dataset, including over 300,000 schemes in total;
"training-data.xlsx" is the dataset used for actual model training, including 46,500 schemes;
"template_data.xlsx" is the selected template library data, and the "template imgs" folder contains images of the color schemes from the template library.
"3-Model":
Related programs for the CGAN model, "CGAN_CUDA_model _d_g.ipynb" is the model program,
"generator_model.pt" is the pre-trained model parameters, and "process_imgs" stores test output images from the training process.
"4-html_tool":
The source code for the front-end interactive tool mentioned in the experimental section 4.5, download this folder and open the "page_hex_en.html" file to experience it.
"5-Complete image results of the experiment":
Complete image result data from the experiment, corresponding to Figures 7 and 8 in the paper.

Note: To better describe the themes, the theme tags on the "html_tool" page are different from the brief tags in the training dataset,
The corresponding relationships are as follows ("html_tool" page - training dataset): cate-food, starry sky-stars, illustration-pixiv, oil painting-oil, film-CNU, solemnity-dangjian.
