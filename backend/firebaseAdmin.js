const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "cnc-diagnostic-app",
  "private_key_id": "a28ce0f94c5f6ebb304f0c5ff011b8da5d81ce4e",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDs0eabT1IcO/0Y\\nIYXnv8rvtruaGWiXcl4hqdukbY4giQsGPWCDX4BZzvaHG4RQC/DAR4JOF/wgwgjy\\n7FAV5JHk3F6y8F+tpCNEjZosd+Sr9QcNQXjemz6dqTOnOx2AszA096xOXM3Z45U0\\nlKvjISduOUTVPL+B0/BCBBgkR6ptTqckmB26dzUSmnu9fZjZPw0G39CQOwd8C0RE\\nFuYAiqVZybf3pgz9OS1VEf+W/K3xPP9cb3chD5jKWdOYNKPRBu9FMWCRq0mZIqyw\\n04EVP6A/Ml/U77F+xCFuB/iCTbeC61KSdzOOSMKJcJbaB2jrXdUVH9YQUHaZTECQ\\nVgHDJ1PRAgMBAAECggEABVy5MIs6tM5XOvhDCp9PWWkXvKnlO/4tLcV+IXMQrBfE\\ncPt/QWkHBEZ83NYk5dDx2+UCnNnoy1agyMiRe6dEROFW+NIbclhijZX5YD5jV4JX\\n9xIuNl84IVqISH6y3QIn0uUNYEV5NobzXbLiPXkt3Dqsz6DF9tm/INlibBfgjaF4\\n5rwtKvJwlUYqX+Tw06JxOmjcrVjuHKKCMmYaqaHMby5QRhSZePWxEcxNBiN/87J3\\nU8oM/aqjdkMOi5vESFwdt10SRLmjIg0RiIpdBSuo7HCigUYUJhmHO42B0DHYZf7D\\nWt2RsSKHJuQQ40AV88LISVR7yCfxSUjRXeYWDPHMbQKBgQD9DiOWzu7ylpgjO/6T\\nIfXwBtyMQQqC1xnRM4f9pAO6toMumCd5epGiT3Ldjj12fgY2R7kOu9GtsA3fwrxE\\nOZxA+AhfIY0QCOCS2YjhQAti4249q/BQKfyvgfXKQzMMqifLmJ7gFQHCxiAVyoje\\nQxBZNPhJM0i/jbdO4pnGrFIzgwKBgQDvk2Vtw7jpGrNatjEX50PQxg74O82FZWqt\\nauDDK4u/sr1BUBv81ZD91ToOYmr10f+8SLGntFTNDJCv0HQGtfZ8LQQZAGWyhjRK\\nsMkFfDOL8SlKSt6EG9aYeNlR7deCcHGMZrqSCrW+lf+GvSEYmRL+L2fJUcBZlQur\\nIPosNS53GwKBgQDP2/VPwtpzWU/OYVFS+epSJtCyRBqmLpl+RZ3Gshp+G7zVYRXL\\nqupFMI1hf5zs38eqfm97srsguCQtUH/kao32r8XwnlaIfUI6XYUZwMmZiMbc0Yar\\n0lFEuLN0WI5uMLZPfiXCWn7/xk5EmACk0OF05RWsyvtOnNGdcnRtxM4gkQKBgQDW\\nMQCw5xjOB9osktFHnrMJ19mQY982kVqT2wdCVw9lf0cnOpkbLlGoL1ftfl5EktDC\\npHd5CYf7n21IUuU5DrxlftW4CJvjxYrA8Fd5OPbY+e7Bhjh1AnKU9Q7O6gcQjrlm\\nHn5VjY+56l9/Nl59oHXTncx7uERxkwjQofYpSg7V2wKBgQDTzSUcQS5BkTdGEfa2\\nAejhu/mtqBE3hWSo00L/E9NMETmqPkKKBRFcWfGGy9rE2HCCqhWZeLGqrMqeWOr5\\nUYAlUYMV9TWzDA/DPsDVbaImKhe1sGPL8rgefciTslyO8L67Jsl7P/ssuuM6moUC\\ntzTL/uh6Ry0tipWQIyCP9k8nhg==\\n-----END PRIVATE KEY-----\\n".replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-fbsvc@cnc-diagnostic-app.iam.gserviceaccount.com",
  "client_id": "110326965446519511205",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40cnc-diagnostic-app.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cnc-diagnostic-app.firebaseio.com"
});

module.exports = admin;
