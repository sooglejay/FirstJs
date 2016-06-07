   function getJson(){
    var json = {
              name:"sooglejay",
              email:"394055524@qq.com"
    }
    return json;
}
function toZipAndDownload(){
           // compress files to zip 
          $.get("to_zip", function (data, status) {
                // download zip file
                alert("download  success!");
                window.location.href =document.location+'zip.zip';
            });
}
function postJsonString(){
  $.post( "/post_with_params",getJson(),
            function(data,status){
                  alert("上传json成功！");
            },"json");
}

$(document).ready(function () {
        $("#import").click(function () {
               toZipAndDownload();
        });
        $("#upload").click(function(){
            postJsonString();
      });
    });
