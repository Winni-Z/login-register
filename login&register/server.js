const express=require('express');
const db=require('./db/index');
const Users=require('./models/users');
const app=express();
const PORT=3000;
app.disable('x-powered-by');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
// (async()=>{
//     await db
// })();
db
    .then(()=>{

    app.post('/register',async(req,res)=>{
// res.send('ok');测试是否可以登录IP
        const {userName,pwd,rePwd,email}=req.body;
        const userNameReg=/^[a-zA-Z0-9_]{5,12}$/;
        const pwdReg=/^[a-zA-Z0-9_]{5,30}$/;
        const rePwdReg=/^[a-zA-Z0-9_]{5,30}$/;
        const emailReg=/^[a-zA-Z0-9_]{5,20}@[a-zA-Z0-9_]{2,8}\.com$/;
        // userName.test()
        if(!userNameReg.test(userName)){
            res.send('姓名输入不合法，格式应该为：字母、数字、下划线，且长度为5~12位');
            return
        }
        if(!pwdReg.test(pwd)){
            res.send('密码输入不合法，格式应该为：字母、数字、下划线，且长度为5~30位');
            return
        }
        if(!emailReg.test(email)){
            res.send('邮箱输入不合法，格式应该为：邮箱名@服务器名.com，且长度为5~20位');
            return
        }
        if(pwd!==rePwd){
            res.send('两次密码输入不一致，请重新输入');
            return
        }

        try{
            const findDate=await Users.findOne({email});
            if(!findDate){
                await Users.create({userName,pwd,email});
                console.log(`${userName},${email}`);
                res.send('注册成功');
                return
            } else {
                res.send(`${email}邮箱已被注册，请重新填写邮箱`)
            }
        }catch(err){
            console.log(err);
            res.send('网络不稳定，请稍后重试')
        }
    });
    app.post('/login',(req,res)=>{
        const {userName,pwd}=req.body;
        try {
           const fingDate=Users.findOne({userName,pwd})
        if(!fingDate){
            res.send('用户名或密码错误')
        }else {
           res.redirect('https://www.baidu.com')
        }
        }catch(err){
            console.log(err);
            res.send('网络不稳定，请稍后重试');
        }
    });

    app.get('/login',(req,res)=>{
        res.sendFile(__dirname+'/public/login.html')
    });
    app.get('/register',(req,res)=>{
        res.sendFile(__dirname+'/public/register.html')
    })

})
    .catch ((err)=>{
        console.log(err);
    });




app.listen(PORT,(err)=>{
    if(!err){
        console.log(`服务器启动成功了，端口号为${PORT}`);
    } else {
        console.log(err);
    }
});