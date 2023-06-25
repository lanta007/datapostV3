import * as admin from 'firebase-admin';
import * as fs from 'fs';

// กำหนดค่าให้กับ Firebase Admin SDK
const serviceAccount = require('path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://nosql-test-25b1d.appspot.com"
});

// ฟังก์ชันสำหรับอัปโหลดไฟล์รูปภาพไปยัง Firebase Storage
async function uploadImageToFirebaseStorage(imagePath, destinationPath) {
  const bucket = admin.storage().bucket();

  // อ่านไฟล์รูปภาพจากพาธในระบบไฟล์
  const imageBuffer = fs.readFileSync(imagePath);

  // อัปโหลดไฟล์รูปภาพไปยัง Firebase Storage
  await bucket.file(destinationPath).save(imageBuffer, {
    contentType: 'image/jpeg' // ประเภทของไฟล์รูปภาพ
  });

  console.log('Image uploaded successfully');
}

// เรียกใช้ฟังก์ชันเพื่ออัปโหลดไฟล์รูปภาพ
uploadImageToFirebaseStorage('path/to/image.jpg', 'images/image.jpg')
  .catch(error => {
    console.error('Error uploading image:', error);
  });
