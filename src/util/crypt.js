import crypto from 'crypto'
//给我公钥，和要encrypt的数据，我返回encrypt后的数据
export default function encrypt(publickey,data){
    let encrypteddata=crypto.publicEncrypt({
        key:publickey,
        padding:crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash:"sha256"
    },Buffer.from(data))
    return encrypteddata
}
