// $(document).ready(main);
// $(main);
window.onload = main;

function main(){
    // 我们使用两个输入框来引入本地资源和线上资源
    const oUpload = document.getElementById('input-upload');
    const oInput = document.getElementById('input-url');
    // 除此之外还需要一个img标签来加载数据和进行展示
    const oImg = document.getElementById('input-img');

    oUpload.onchange = loadFile;
    oInput.onchange = loadUrl;

    // 读取本地文件
    function loadFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = onFileLoad;
        reader.readAsDataURL(file);
    }

    // 读取输入URL
    function loadUrl(e) {
        oInput.classList.remove('err')
        const url = e.target.value;
        onFileLoad(url);
    }

    // 加载图片数据
    function onFileLoad(src) {
        oImg.onload = function() {
            onImageLoad()// 这里使用图像数据，后续讲解
        };
        oImg.onerror = onImageErr;
        oImg.src = (src.target ? src.target.result : src);
    }

    function onImageErr() {
        oInput.classList.add('err');
    }
    
    // canvas实例
    const oCanvas = document.getElementById('my-canvas');
    oCanvas.onclick = onClick;
    var imageData = null;

    // 上面读取资源的操作后，将图像画到canvas上
    function onImageLoad() {
        const width = oCanvas.width = oImg.naturalWidth || oImg.width;
        const height = oCanvas.height = oImg.naturalHeight || oImg.height;
        const ctx = oCanvas.getContext("2d");
        ctx.drawImage(oImg, 0, 0);

        // // 获取画布像素信息
        imageData = ctx.getImageData(0, 0, width, height);

        // // 一个像素点由RGBA四个值组成，data为[R,G,B,A [,R,G,B,A[...]]]组成的一维数组
        // // 可以通过修改该数组的数据，达到修改图片内容的目的
        // const data = imageData.data;
        // filter(data);// 这里对图像数据进行处理

        // // 把新的内容画进画布里
        // ctx.putImageData(imageData, 0, 0);
    }

    // click canvas
    function onClick(e) {
        const x = event.pageX - this.offsetLeft;
        const y = event.pageY - this.offsetTop;
        const ctx = oCanvas.getContext('2d');
        const imgData = ctx.getImageData(x, y, 1, 1).data;
        const R = imgData[0];
        const G = imgData[1];
        const B = imgData[2];
        const rgb = R + ',' + G + ',' + B;
        console.log(rgb);
        updateImageDate(imgData);
    }

    function updateImageDate(imageDataPoint) {
        const ctx = oCanvas.getContext("2d");
        // const width = oCanvas.width = oImg.naturalWidth || oImg.width;
        // const height = oCanvas.height = oImg.naturalHeight || oImg.height;
        // ctx.drawImage(oImg, 0, 0);

        // // 获取画布像素信息
        // const imageData = ctx.getImageData(0, 0, width, height);

        // 一个像素点由RGBA四个值组成，data为[R,G,B,A [,R,G,B,A[...]]]组成的一维数组
        // 可以通过修改该数组的数据，达到修改图片内容的目的
        filter(imageData.data, imageDataPoint);// 这里对图像数据进行处理

        // 把新的内容画进画布里
        ctx.putImageData(imageData, 0, 0);
    }

    // 一个A标签，让用户点击用的
    const oDownload = document.getElementById('download');
    // 从画布上读取数据并保存到本地
    function setDownLoad(fileName) {
        const url  = oCanvas.toDataURL();
        oDownload.setAttribute('href', url);
        oDownload.setAttribute('target', '_blank');

        if (fileName) {
            oDownload.setAttribute('download', fileName);
        }
    }

    function filter(data, imageDataPoint) {
        pR = imageDataPoint[0];
        pG = imageDataPoint[1];
        pB = imageDataPoint[2];
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i],
                g = data[i + 1],
                b = data[i + 2];

            // 色值在250-256之间都认为是白色
            if ([r, g, b].every(v => v < 256 && v > 250)) {
                data[i + 3] = 0; // 把白色改成透明的  
            } 
            // else if ((r < 256 && r > 200) && (g < 50 && r > 0) && (b < 50 && r > 0)) {
            //     data[i + 3] = 0; // 把红色改成透明的 
            // } 
            // else if ((r < 50 && r > 0) && (g < 50 && r > 0) && (b < 256 && r > 250)) {
            //     data[i + 3] = 0; // 把蓝色改成透明的 
            // } 
            else if ((r <= pR * 1.3 && r >= pR * 0.7) && (g <= pG * 1.3 && g >= pG * 0.7) && (b <= pB * 1.3 && b >= pB * 0.7)) {
                data[i + 3] = 0; // 把白色改成透明的
            }
        }
    }
}