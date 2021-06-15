const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const request = require('request');


function InitData(result){
    if(result === undefined) return undefined;
    result =result.split("\t").join("_")
    result = result.split("_\n").join("_")
    result = result.split("_")
     
    lengtkb = result.length-1;
    MaxTKB = lengtkb /12
    console.log("Max tkb = "+MaxTKB)


    var data = []
    for (let index = 0; index < MaxTKB; index++) {
    numMon = index;

    var MonHocJson = {"maMonHoc" : result[numMon*12],
        "tenMonHoc" : result[numMon*12 +1],
        "nhomMonHoc" : result[numMon*12 + 2],
        "soTinChi" : result[numMon*12 + 3],
        "khongDK" : result[numMon*12 + 4],
        "thucHanh" : result[numMon*12 + 5].indexOf("\n")>0 ? result[numMon*12 + 5].split("\n").filter(e => e !== "") : [result[numMon*12 + 5]],
        "thu" : result[numMon*12 + 6].indexOf("\n")>0 ? result[numMon*12 + 6].split("\n").filter(e => e !== "") : [result[numMon*12 + 6]],
        "tietBatDau" : result[numMon*12 + 7].indexOf("\n")>0 ? result[numMon*12 + 7].split("\n").filter(e => e !== "") : [result[numMon*12 + 7]],
        "soTiet" : result[numMon*12 + 8].indexOf("\n")>0 ? result[numMon*12 + 8].split("\n").filter(e => e !== "") : [result[numMon*12 + 8]],
        "phong" : result[numMon*12 + 9].indexOf("\n")>0 ? result[numMon*12 + 9].split("\n").filter(e => e !== "") : [result[numMon*12 + 9]],
        "canBoGV" : result[numMon*12 + 10].indexOf("\n")>0 ? result[numMon*12 + 10].split("\n").filter(e => e !== "") : [result[numMon*12 + 10]],
        "thoiGianHoc" : result[numMon*12 + 11].indexOf("\n")>0 ? result[numMon*12 + 11].split("\n").filter(e => e !== "") : [result[numMon*12 + 11]],
        };
        //var dictstring = JSON.stringify(MonHocJson);
        data[index] = MonHocJson   
    }
    dataOut = JSON.stringify(data);
    // fs.writeFileSync("tkb.json",dataOut );
    //console.log(result)
    return data;
}

function InitDataTHI(result){
    if(result === undefined) return undefined;
    result =result.split("\t").join("_")
    result = result.split("_\n").join("_")
    result = result.split("_")
    lengtkb = result.length-1;
    MaxTKB = lengtkb /10
    console.log("Max Lich Thi = "+MaxTKB)

    // for()

    var data = []
    for (let index = 0; index < MaxTKB; index++) {
    numMon = index; 
    // console.log(result[0])
    var MonThiJson = {"maMonHoc" : result[numMon*10+1],
        "tenMonHoc" : result[numMon*10 + 2],
        "nhomThi" : result[numMon*10 + 3],
        "toThi" : result[numMon*10 + 4],
        "ngayThi" : result[numMon*10 + 5].indexOf("\n")>0 ? result[numMon*10 + 5].split("\n").filter(e => e !== "") : result[numMon*10 + 5],
        "gioBD" : result[numMon*10 + 6].indexOf("\n")>0 ? result[numMon*10 + 6].split("\n").filter(e => e !== "") : result[numMon*10 + 6],
        "soPhut" : result[numMon*10 + 7].indexOf("\n")>0 ? result[numMon*10 + 7].split("\n").filter(e => e !== "") : result[numMon*10 + 7],
        "phong" : result[numMon*10 + 8].indexOf("\n")>0 ? result[numMon*10 + 8].split("\n").filter(e => e !== "") : result[numMon*10 + 8],
        "ghiChu" : result[numMon*10 + 9].indexOf("\n")>0 ? result[numMon*10 + 9].split("\n").filter(e => e !== "") : result[numMon*10 + 9],
        //"dsThi" : result[numMon*10 + 10].indexOf("\n")>0 ? result[numMon*10 + 10].split("\n").filter(e => e !== "") : [result[numMon*10 + 10]]
        };
        //var dictstring = JSON.stringify(MonHocJson);
        data[index] = MonThiJson   
    }
    dataOut = JSON.stringify(data);
    // fs.writeFileSync("tkb.json",dataOut );
    //console.log(result)
    return data;
}


link = "http://daotao.hutech.edu.vn/default.aspx?page=dangnhap";
link1 = "http://daotao.hutech.edu.vn/default.aspx?page=thoikhoabieu&sta=1";

var userName = "";
var passWord = "";
async function Login(){
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      });
        const page = await browser.newPage();
        const page2 = await browser.newPage();
        await page.goto(link, {waitUntil: 'load',timeout: 0});        

        try {
            await page.evaluate(() => console.log(`url is ${location.href}`));
        }catch (error){
            console.log("cannot load!");
        };

        console.log(userName +"|"+ passWord)
        await page.evaluate(({userName,passWord}) =>{
            debugger;            
            document.getElementById('ctl00_ContentPlaceHolder1_ctl00_txtTaiKhoa').value = userName;
            document.getElementById('ctl00_ContentPlaceHolder1_ctl00_txtMatKhau').value = passWord;
            document.getElementById("ctl00_ContentPlaceHolder1_ctl00_btnDangNhap").click();             
        },{userName,passWord});
        
        await page.screenshot({path: '1login.png'});

        try {
            await page.evaluate(() => {
                debugger;
                window.alert = function () {return true};
            });
            await page.screenshot({path: '1loginCloseAlert.png'});
        }catch (error){
            console.log("error: closeAlert 1loginCloseAlert: " + error);
        };

        try {
            await page.evaluate(() => {
                debugger;
                window.alert = function () {return true};
            });
            //await page.screenshot({path: '1loginCloseAlert.png'});
        }catch (error){
            console.log("error: closeAlert 1loginCloseAlert1: " + error);
        };
        
        try {
            await page.screenshot({path: '1loginReady.png'});
            const callOut = await page.evaluate(() => {
                debugger;
                if(document.body.innerText.indexOf("Sai thông tin đăng nhập")>0)
                    return false;
                else
                    return true;
            });

            if(callOut === false){
                await browser.close();
                return {Message: "Exit Request (wrong username or password)"};
                
                // return "Exit";
            }
        }catch (error){
            console.log(error)
            //return {Message: ${error}};// "Exit Request (bá» li trai á» gĂªn)"
            // await browser.close();
            // return "Exit";
        };


        try {
            await page.evaluate(() => {
                debugger;
                window.alert = function () {return true};
            });
            await page.screenshot({path: '2closeAlertChange.png'});
        }catch (error){
            console.log("error: closeAlert 2closeAlertChange: " + error);
        };

        try {
            await page.evaluate(() => {
                debugger;
                window.alert = function () {return true};
            });
            await page.screenshot({path: '2closeAlertChange.png'});
        }catch (error){
            console.log("error: closeAlert 2closeAlertChange: " + error);
        };

        //await page.screenshot({path: '2closeAlertChangeReady.png'});
        try {
            await page.evaluate(() => {
                debugger;
                window.alert = function () {return true};
            });
            //await page.screenshot({path: '2closeAlertChange.png'});
        }catch (error){
            console.log("error: closeAlert 2closeAlertChange: " + error);
        };


        // tkb click
        //await page.goto(link1, {waitUntil: 'load',timeout: 0});
        try {
            await page.screenshot({path: '2closeAlertChangeReady.png'});
            await page.evaluate(() => {
                debugger;                      
                document.getElementById("ctl00_menu_lblThoiKhoaBieu").click();                
            });
            
        }catch (error){
            await browser.close();
            return {Message: "Exit Request (show tkb failed)" + error};
        };
        //goto tkb
        try {            
            await page.evaluate(() => {
                debugger;                
                window.alert = function () {return true};         
            });
            
            await page.screenshot({path: '4ThoiKhoaBieuClickCloseAlert.png'});
        }catch (error){
            console.log("error: tkb: "+ error);
        };
        try {            
            await page.evaluate(() => {
                debugger;                
                window.alert = function () {return true};         
            });
            
            await page.screenshot({path: '4ThoiKhoaBieuClickCloseAlert.png'});
        }catch (error){
            console.log("error: tkb: "+ error);
        };
        // tkb click done


        let dataGet= [];
        try {
            await page.screenshot({path: '6closeAlertChange.png'});
            const getChildOption = await page.evaluate(() => {
                debugger;
                var arrayGet = [];
                // if(document.getElementById("ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK").children == null)
                //     return "missing table"
                childGet = document.getElementById("ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK").children.length
                   for (let index = 0; index < childGet; index++) {
                       arrayGet[index] = document.getElementById("ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK").children[index].value;                       
                   }
                return arrayGet;
            });

            console.log(getChildOption)

            for (let y = 0; y < getChildOption.length; y++) {
                num = y;
                const valueChild = await page.evaluate(({num,getChildOption}) => {
                    debugger;
                    const $ = window.$; //otherwise the transpiler will rename it and won't work
                    if(num != 0){
                        let value = document.getElementById("ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK").children[num].value
                        $("#ctl00_ContentPlaceHolder1_ctl00_ddlChonNHHK").val(value).change();  
                        return value;    
                    }               
                    return getChildOption[0];                 
                },{num,getChildOption}); 

               
               // close alert
                try {
                    await page.evaluate(() => {
                        debugger;                
                        window.alert = function () {return true};                            
                    });
                    await page.screenshot({path: '6closeAlertChange.png'});
                }catch (error){
                    console.log("error: alert 1: "+ error);
                };

                // close alert
                try {
                    await page.evaluate(() => {
                        debugger;                
                        window.alert = function () {return true};                            
                    });
                    await page.screenshot({path: '6closeAlertChange.png'});
                }catch (error){
                    console.log("error: alert 2: "+ error);
                };

                try {
                    await page.evaluate(() => {
                        debugger;                
                        window.alert = function () {return true};                            
                    });
                    await page.screenshot({path: '6closeAlertChange.png'});
                }catch (error){
                    console.log("error: alert 3: "+ error);
                };

                try {
                    await page.evaluate(() => {
                        debugger;                
                        window.alert = function () {return true};         
                    });
                    
                    await page.screenshot({path: '6closeAlertChange.png'});
                }catch (error){
                    console.log("error: alert 4: "+ error);
                };
                
                //done close alert


                console.log(valueChild)

                //try result
                try {
                         results = await page.evaluate( async() => {
                            debugger;
                            if(document.getElementsByClassName("grid-roll2")[0] !== undefined){
                                let message = "";
                                    var text =document.getElementsByClassName("grid-roll2")[0];
                                    //setTimeout(function(){ }, 3000);
                                    if(text.childElementCount == 0) return message;
                                    for(var i=0;i< text.childElementCount;i++){ //childElementCount
                                        message += document.getElementsByClassName("grid-roll2")[0].children[i].innerText;
                                    }
                                    return message;                               
                            }                                
                            else{
                                return results = undefined;
                            }
                        });

                    dataGet.push({
                        year:valueChild,
                        tkb:results
                    });

                }catch (error){
                    console.log("Exit Request (Result not found)"   );
                    await browser.close();
                    return "Exit"
                };

            }
        }catch (error){
            console.log("error: 5GetChildOption: "+ error);
        };

///get lịch thi
    let dataThiGet = [];
    try {

        // lịch thi click
        //await page.goto(link1, {waitUntil: 'load',timeout: 0});
        try {
            await page.screenshot({path: '2closeAlertChangeReady.png'});
            await page.evaluate(() => {
                debugger;                      
                document.getElementById("ctl00_menu_lblXemLichThi").click();                
            });
            
        }catch (error){
            await browser.close();
            return {Message: "Exit Request (show tkb failed)" + error};
        };
        //lịch thi click

        await page.screenshot({path: '6-1closeAlertChange.png'});

        try {
            await page.evaluate(() => {
                debugger;                
                window.alert = function () {return true};                            
            });
            await page.screenshot({path: '6closeAlertChange.png'});
        }catch (error){
            console.log("error: alert 3: "+ error);
        };

        try {
            await page.evaluate(() => {
                debugger;                
                window.alert = function () {return true};         
            });
            
            await page.screenshot({path: '6closeAlertChange.png'});
        }catch (error){
            console.log("error: alert 4: "+ error);
        };
        
        //done close alert


    

        //try result
        try {
                results = await page.evaluate( async() => {
                    debugger;
                    if(document.getElementsByClassName("grid-view")[0] !== undefined){
                        let message = "";
                            var text =document.getElementsByClassName("grid-view")[0].children[0];
                            //setTimeout(function(){ }, 3000);
                            if(text.childElementCount == 0) return message;
                            for(var i=1;i< text.childElementCount;i++){ //childElementCount
                                message += document.getElementsByClassName("grid-view")[0].children[0].children[i].innerText;
                            }
                            return message;                               
                    }                                
                    else{
                        return results = undefined;
                    }
                });
                // console.log(results)

            dataThiGet.push({
                thi:results
            });

        }catch (error){
            console.log("Exit Request (Result not found) "+ error);
            await browser.close();
            return "Exit"
        };
   
    }catch (error){
        console.log("error: 5GetChildOption: "+ error);
    };






        for (let i = 0; i < dataGet.length; i++) {
            dataGet[i].tkb = InitData(dataGet[i].tkb);                      
        }

            dataThiGet[0].thi = InitDataTHI(dataThiGet[0].thi);
        
            
        for (let i = 0; i < dataThiGet[0].thi.length; i++) {
            console.log(dataThiGet[0].thi[i])            
    }
    await browser.close();
    

    return {dataGet,dataThiGet};   


};

function GetInfo(callback){
    request.post(
    'https://api.hutech.edu.vn/authentication/api/auth/login',
    { json: { "username":userName,"password":passWord,"captcha":null,"app":"MOBILE_HUTECH","diuu":"123" } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            data = "JWT "+response.body.token
            const options = {
                url: 'https://api.hutech.edu.vn/ren-luyen-sinh-vien/api/sinh-vien/get-by-mssv',
                headers: {
                  'authorization': data
                }
              };
            
             request(options, function (error, response, body){
                    var data = JSON.parse(body);  
                    // console.log(data.result); 
                    return callback(null, data.result);
              });
        }else{
            return callback(null, "Cannot load Information of Student");
        }
    });
}

const PORT =  process.env.PORT ||3000;
app.get("/", async(req,res) => {
    //some how 
    console.log(req.query)

    if(req.query.username == undefined || req.query.password == undefined )
        return res.json({message:"Sai định dạng. VD: ?username=asdasd&password=asdasd"})

    userName = req.query.username;
    passWord = req.query.password;
    // 
    // res.json(GetInfo());
    // console.log(await Login())
    // res.json();
    GetInfo(async function(err, result){
         let data = await Login();
         let student = {
             tkb: data.dataGet,
             info: result,
             thi:data.dataThiGet[0].thi
         }
        //  data[data.length] = {info: result};
        
        // console.log(result.result);
         res.json(student);
    })
     
})
app.listen(PORT, () => console.log(`Started server at ${PORT}!`));



// api login-> reponse token: JWT + token: https://api.hutech.edu.vn/authentication/api/auth/login
// form: {"username":"1811060534","password":"htth26212","captcha":null,"app":"MOBILE_HUTECH","diuu":"123"}

//api get information of Student: https://api.hutech.edu.vn/ren-luyen-sinh-vien/api/sinh-vien/get-by-mssv
