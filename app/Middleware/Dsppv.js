'use strict'


const { Builder, By, Key, promise, until } = use('selenium-webdriver');
const firefox = use('selenium-webdriver/firefox');
var fs = use('fs');


class Dsppv {
  async handle({request}, next) {
    // call next to advance the request
    //DSP=======================================================================================================================================
    const DSPUser = 'data_admin@clickforce.com';
    const DSPPassword = 'data0629'
    //========================================================================
    promise.USE_PROMISE_MANAGER = false;

    var data = request.all();
    var site_name = data.site_name;
    var site_url = data.site_url;
    var site_id;


    //要建立的事件 type:'view' 一般頁  type:'click' =點擊事件
    var event = [

      {
        type: 'view',
        name: 'pageview',
        comment: '一般頁'
      },
      {
        type: 'view',
        name: 'usual',
        comment: '一般頁'
      },

    ];

    async function DSPDMP() {
      console.log("DSP、DMP")
      let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        // .addArguments("--headless")
        .build();

      try {
        //登入DSP點擊畫面到人群管理葉面
        await driver.get('https://dsp.doublemax.net/login/index');
        // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        await driver.findElement(By.id('user')).sendKeys(DSPUser);
        await driver.findElement(By.id('password')).sendKeys(DSPPassword);
        //點擊登入DSP
        await driver.findElement(By.id('login-btn')).click();
        await driver.sleep(4000)
        //點擊人群管理1
        await driver.findElement(By.xpath("/html/body/div[2]/div[3]")).click();
        //點擊人群管理2    
        await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/a[1]")).click();
        //==========================新建站點===========================
        // await driver.sleep(500);
        // //點擊 新建站點
        // await driver.findElement(By.xpath("//a[contains(.,'建立站點/活動頁')]")).click();
        // //輸入站點名稱
        // await driver.findElement(By.xpath('//*[@id="RtSite_name"]')).sendKeys(site_name);
        // //輸入站點url
        // await driver.findElement(By.xpath('//*[@id="RtSite_site_url"]')).sendKeys(site_url);
        // //點擊提交按鈕
        // await driver.findElement(By.xpath('//*[@id="form"]/div[2]/input')).click();
        // await driver.sleep(500);
        //=========================用站點名稱取得站點id==============================
        //找出所有人群管理的tr 用來取得某站點的id
        const findtab = await driver.findElement(By.xpath("//*[@id='table-list']/table/tbody"));
        const countTr = findtab.findElements(By.tagName('tr'));
        countTr.then(async function (tr) {
          for (let i = 1; i <= tr.length; i++) {
            var si_id = await driver.findElement(By.xpath("//*[@id='table-list']/table/tbody/tr[" + i + "]/td[2]")).getText();
            // console.log(si_id);
            var si_name = await driver.findElement(By.xpath("//*[@id='table-list']/table/tbody/tr[" + i + "]/td[3]/a/div")).getText();
            // console.log(si_name);
            if (site_name == si_name) {
              site_id = si_id;
            }
          }
        })
        //======================點擊檢視站點===============================
        await driver.sleep(2000);
        //用css selector 選擇要點擊的操作下拉選單
        await driver.findElement(By.css("*[data-id='" + site_id + "']")).click();
        //點擊 檢視站點
        await driver.findElement(By.xpath("//a[contains(.,'檢視站點站點/活動頁')]")).click();
        //===========================新建轉換事件/動作=========================
        // const event_num = event.length;
        // for (let j = 0; j < event_num; j++) {
        //   await driver.sleep(1000);
        //   await driver.findElement(By.xpath("//a[contains(.,'新建轉換事件/動作')]")).click();

        //   await driver.findElement(By.id('RtAction_name')).sendKeys(event[j].name);
        //   //當事件類型為點擊事件的話，就要改為點擊事件
        //   if (event[j].type == 'click') {
        //     await driver.findElement(By.css('#select-type > option:nth-child(2)')).click();
        //     await driver.findElement(By.css('#select-action > option:nth-child(3)')).click();
        //     await driver.findElement(By.id('RtAction_action')).sendKeys(event[j].name);
        //   }
        //   await driver.findElement(By.id('RtAction_tag')).sendKeys(event[j].comment);
        //   await driver.findElement(By.xpath("//*[@id='form']/div[2]/input")).click();
        // }

        //=======================取得站點下所有事件並log下來成txt檔
        const test = await driver.findElement(By.xpath("//*[@id='table-list']/table/tbody"));
        const testtr = test.findElements(By.tagName('tr'));
        var usualtext;
        testtr.then(async function (ele) {
          // console.log(ele.length);
          var place2;
          const place = driver.findElement(By.xpath("/html/body/div[3]/div[2]/div[2]/div[1]/div[1]/span")).getText();
          await place.then(function (text) {
            place2 = text
          })
          var dir = 'public/' + place2;
          var dir2 = 'public/' + place2 + '/DSP'
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          if (!fs.existsSync(dir2)) {
            fs.mkdirSync(dir2);
          }
          for (let i = 1; i <= ele.length; i++) {

            const event_name = await driver.findElement(By.xpath("//*[@id='table-list']/table/tbody/tr[" + i + "]/td[2]")).getText()
            console.log(event_name);
            //檔案路徑和檔案名稱
            const filename = "public/" + place2 + "/DSP/" + event_name + ".txt";
            //點擊 操作 欄的下拉選單
            await driver.findElement(By.xpath("//*[@id='table-list']/table/tbody/tr[" + i + "]/td[9]")).click();
            //用xpath的方式去找到特定 文字 的元件
            await driver.findElement(By.xpath("//a[contains(.,'取得代碼')]")).click();

            await driver.sleep(1000);
            const textPromise = driver.findElement(By.xpath("//*[@id='modal-lg']/div[2]/pre")).getText();
            //取得文字方法
            var getText;
            await textPromise.then(function (text) {
              getText = text
            })
            await clklogfile(filename, event_name, getText);

            await driver.findElement(By.xpath("//*[@id='modal-lg']/div[3]/button")).click();

            await driver.sleep(1000);

            await driver.findElement(By.xpath("//*[@id='table-list']/table/tbody/tr[" + i + "]/td[9]/i")).click();
            await driver.executeScript("window.scrollBy(0,500)");
          }
        })

      } finally {
        // await driver.quit();
      }


      //DSP的存檔function
      async function clklogfile(filename, event_name, getText) {
        // console.log(getText);
        var view_text = "'trackType':'view'";
        var isView = getText.search(view_text);
        //click事件
        if (isView == -1) {
          var libar = "<script src=\"//cdn.doublemax.net/js/rtid.js\"></script>";
          var libar2 = "<script src=\"//dmp.eland-tech.com/dmpreceiver/eland_tracker.js\"></script>";
          var script_tag = "<script>";
          var newtext1 = getText.replace(libar, "");
          var newtext2 = newtext1.replace(libar2, "")
          var add_fun = newtext2.replace(script_tag, "<script>\nfunction " + event_name + "(){");
          var add_fun2 = add_fun.replace("</script>", "}\n</script>");
          //將code存進txt中
          fs.writeFile(filename, add_fun2, (err) => {
            if (err) throw err;
          });

        }
        //PV頁
        else {
          var isUsual = getText.search("'targetType':'usual'");
          if (isUsual == -1) {
            // console.log("非usual")
            var libar = "<script src=\"//cdn.doublemax.net/js/rtid.js\"></script>";
            var libar2 = "<script src=\"//dmp.eland-tech.com/dmpreceiver/eland_tracker.js\"></script>";
            // var libar3 = "<script>";
            //將 lib 取代成空白
            var newtext1 = getText.replace(libar, "");
            var newtext2 = newtext1.replace(libar2, "");
            var newtext3 = newtext2.replace("</script>", usualtext);
            var newtext4 = newtext3.replace("<script>", "<script src=\"//cdn.doublemax.net/js/rtid.js\"></script>\n<script src=\"//dmp.eland-tech.com/dmpreceiver/eland_tracker.js\"></script>\n<script>")
            //將code存進txt中
            fs.writeFile(filename, newtext4, (err) => {
              if (err) throw err;
            });

          } else {
            //將</script>去掉
            var libar = "<script src=\"//cdn.doublemax.net/js/rtid.js\"></script>";
            var libar2 = "<script src=\"//dmp.eland-tech.com/dmpreceiver/eland_tracker.js\"></script>";
            var newtext1 = getText.replace(libar, "");
            var newtext2 = newtext1.replace(libar2, "");
            usualtext = newtext2.replace("<script>", "");

            //將code存進txt中
            fs.writeFile(filename, usualtext, (err) => {
              if (err) throw err;
            });
          }
        }

      }
    }

   
      DSPDMP();
  }
}

module.exports = Dsppv
