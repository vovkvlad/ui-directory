export default function getFileIcon(extension) {
  switch (extension) {
    case 'doc':
    case 'docx':
      return 'fa-file-word';
    case 'pdf':
      return 'fa-file-pdf';
    case 'pptx':
    case 'ppt':
      return 'fa-file-powerpoint';
    case 'xlsx':
    case 'xls':
      return 'fa-file-excel';
    case 'png':
    case 'jpg':
    case 'svg':
    case 'jpeg':
      return 'fa-file-image';
    case 'mkv':
    case 'flv':
    case 'gif':
    case 'avi':
      return 'fa-file-video';
    case 'js':
    case 'css':
    case 'html':
    case 'json':
    case 'xml':
    case 'py':
      return 'fa-file-code';
    case 'gz':
    case '7z':
    case 'jar':
    case 'rar':
    case 'zip':
    case 'tar.gz':
      return 'fa-file-archive';
    default:
      return 'fa-file'
    
  }
}