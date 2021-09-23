import * as bcrypt from 'bcrypt';
import Randomstring from 'randomstring';

export const encryptPassword = async (password)=>{
    // const _ ="hello"
    const saltRounds = 14;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    
    return hashedPassword
};
// console.log(encryptPassword("12222"))
export const isPasswordTrue = async (currentPassword, hashedPassword)=>{
    const isPasswordChecked = await bcrypt.compareSync(currentPassword, hashedPassword);
    return isPasswordChecked;
}
export const randomString = () => {
    const _ = new Date().getMilliseconds()
    return new String(`IMG_${_}_`).concat(Randomstring.generate(13));
};
