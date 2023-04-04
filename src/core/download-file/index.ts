import http from '@/core/http';
import { DownloadFileParams } from './type';

const MIME_TYPE_MAP = {
  'text/plain': '.txt',
  'text/html': '.html',
  'text/css': '.css',
  'text/javascript': '.js',
  'application/json': '.json',
  'application/xml': '.xml',
  'application/pdf': '.pdf',
  'application/zip': '.zip',
  'application/octet-stream': '.bin',
  'image/jpeg': '.jpeg',
  'image/png': '.png',
  'image/gif': '.gif',
  'audio/mpeg': '.mp3',
  'audio/wav': '.wav',
  'video/mp4': '.mp4',
  'multipart/form-data': '',
  // 其他 MIME 类型和扩展名的映射关系
};

/**
 * 获取文件扩展名
 *
 * 根据 blob 类型获取文件扩展名
 */
const getFileExtension = (blob: Blob) => {
  return MIME_TYPE_MAP[blob.type as keyof typeof MIME_TYPE_MAP] || 'txt';
};

export default async (params: DownloadFileParams) => {
  const { url, method = 'GET' } = params;

  let fileName = params.fileName || 'download';

  const res = await http.requestFile({
    url,
    method,
  });

  const blob: Blob = res.data;

  if (!fileName || !fileName.includes('.')) {
    const fileExtension = getFileExtension(blob);
    fileName = `${fileName}.${fileExtension}`;
  }

  const downloadElement = document.createElement('a');
  const downloadHref = URL.createObjectURL(blob);
  downloadElement.href = downloadHref;
  downloadElement.download = fileName;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  URL.revokeObjectURL(downloadHref);

  return res;
};
