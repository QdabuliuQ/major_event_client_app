export function fileType (fileName: string) {  // 判断文件类型
  let suffix = ''; // 后缀获取
  let result: any = ''; // 获取类型结果
  if (fileName) {
    const flieArr = fileName.split('.'); // 根据.分割数组
    suffix = flieArr[flieArr.length - 1]; // 取最后一个
  }
  if (!suffix) return false; // fileName无后缀返回false
  suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
  // 匹配图片
  const imgList = ['png', 'jpg', 'jpeg', 'gif']; // 图片格式
  result = imgList.find(item => item === suffix);
  if (result) return 'image';
}