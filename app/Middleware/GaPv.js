'use strict'

const { Builder, By, Key, promise, until } = use('selenium-webdriver');
const firefox = use('selenium-webdriver/firefox');
var fs = use('fs');

class GaPv {
  async handle ({ request,response }, next) {
    // call next to advance the request


        //GA================================================================================================================
    //GA帳密
    // var GAUser = 'clickforce03@gmail.com';
    // var GAPassword = 'click168';
    var GAUser = 'dennygod19951220@gmail.com';
    var GAPassword = 'd28208801';
    //帳戶
    var ga_account_name = request.only('site_name').site_name;
    // 網站
    var ga_site_name = request.only('in_site_name').in_site_name;
    // 網址
    var ga_url = request.only('site_url').site_url;


    async function GA(response){
        console.log("only GA")
        let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        // .addArguments("--headless")
        .build();

        try {
            //到GA登入頁面
            await driver.get('https://accounts.google.com/signin/v2/identifier?service=analytics&passive=true&nui=1&hl=zh-TW&continue=https%3A%2F%2Fwww.google.com%2Fanalytics%2Fweb%2F%3Fhl%3Dzh-TW&followup=https%3A%2F%2Fwww.google.com%2Fanalytics%2Fweb%2F%3Fhl%3Dzh-TW&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
            await driver.sleep(1000);
            //輸入帳號
            await driver.findElement(By.css('#identifierId')).sendKeys(GAUser);
            await driver.findElement(By.id('identifierNext')).click();
            await driver.sleep(1000);
            //輸入密碼
            await driver.findElement(By.css('#password > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)')).sendKeys(GAPassword);
            await driver.findElement(By.id('passwordNext')).click();
            await driver.sleep(6000);
    
    //點擊 管理
            await driver.findElement(By.css('#bottomSectionAdmin > nav > div > div > ga-nav-link > div > report-link > a')).click();            
            await driver.sleep(5000);
            //點擊 建立帳戶
            await driver.findElement(By.css('#admin-account-column > h2 > div.column-title > button > span')).click();
            await driver.sleep(2000);
            //輸入 新帳戶名稱
            await driver.findElement(By.css('#admin-content-column > section > ui-view > form > div > div.content > input')).sendKeys(ga_account_name);
            //輸入 網站名稱
            await driver.findElement(By.css('#admin-content-column > section > ui-view > form > new-property-settings > div.ng-scope > div:nth-child(1) > div.content > input')).sendKeys(ga_site_name);
            await driver.sleep(500);
            //輸入 網站網址
            await driver.findElement(By.css('#admin-content-column > section > ui-view > form > new-property-settings > div.ng-scope > div:nth-child(2) > div.content > ga-url-selector > input')).sendKeys(ga_url);
            //網頁 往下
            await driver.executeScript("window.scrollBy(0,1000)");
            //點擊 取得追蹤ID 按鈕
            await driver.findElement(By.css('#admin-content-column > section > ui-view > form > ga-submit-buttons > div > button.btn.action.ng-binding.ng-scope')).click();
            await driver.sleep(2500);
            //勾選 接受GDPR
            await driver.findElement(By.css('body > div.large.ga-dialog > section:nth-child(3) > div > md-checkbox > div.md-container.md-ink-ripple')).click();
            //勾選 接受 與 google共用資料
            await driver.findElement(By.css('body > div.large.ga-dialog > section.data-sharing-co-controller-terms.ng-scope > div:nth-child(4) > md-checkbox > div.md-container.md-ink-ripple')).click();
            //點擊 我接受 按鈕 
            await driver.findElement(By.css('body > div.large.ga-dialog > section.ga-dialog-buttons.ng-scope > button.btn.confirm-button')).click();
            await driver.sleep(8000);
            //跳轉到取code頁面
            //切換 iframe
            const ifra = await driver.findElement(By.id('galaxyIframe'));
            await driver.switchTo().frame(ifra);
            //取得此網站 GA序號 將GA序號儲存於 code這變數中
            const code = await driver.findElement(By.xpath('//*[@id="ID-m-content-header"]/div[1]/div[1]/div[2]')).getText();
            await console.log("GA 序號:"+code);        
            //點擊返回
            await driver.sleep(1000);
            //切換回主要content
            await driver.switchTo().defaultContent();
            //點擊 資源設定
            await driver.findElement(By.css('#admin-property-column > div > ga-admin-item:nth-child(2) > ga-admin-link > a > div.link-text.ng-scope')).click();
            await driver.sleep(3000);
            await driver.executeScript("window.scrollBy(0,1000)");
            await driver.findElement(By.xpath('//*[@id="admin-content-column"]/section/ui-view/form/section[3]/div/div[3]/span/span[2]')).click();
            await driver.findElement(By.xpath('//*[@id="admin-content-column"]/section/ui-view/form/section[4]/div[1]/div[3]/span/span[2]')).click();
            await driver.findElement(By.xpath('//*[@id="admin-content-column"]/section/ui-view/form/ga-submit-buttons/div/button[1]')).click();

            await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div[2]/section/div/div/div[1]/div/button')).click();
            //點擊 目標
            await driver.sleep(2000);
            await driver.findElement(By.css('#admin-view-column > div > ga-admin-item:nth-child(4) > ga-admin-link > a')).click();
            await driver.sleep(2000);
            //切換 iframe
            const ifra2 = await driver.findElement(By.id('galaxyIframe'));
            await driver.switchTo().frame(ifra2);
            

            var eve_num = request.only('event_num').event_num;
            if (parseInt(eve_num) > 0) {
                
                for (var i = 1; i < parseInt(eve_num)+1; i++) {
                  var noweve = "eve" + i;
                  var eve_name_obj = request.only(noweve);
                  var eve_name = eve_name_obj[noweve];
                  //點擊 新增目標
                  await driver.sleep(2000);
                  await driver.findElement(By.xpath('//*[@id="ID-goal"]/div[1]/div[1]/div[1]/button')).click();
                  await driver.sleep(5000);
                  //輸入 事件名稱
                  await driver.findElement(By.xpath('//*[@id="ID-goal"]/div/div/div/div/div/div[2]/div/ui-view/ga-wizard/div/div[1]/div[1]/div/ga-wizard-step[2]/div/div[2]/div[1]/div/div[1]/div[2]/input')).sendKeys(eve_name);
                  // 選是類型 事件
                  await driver.findElement(By.css('#ID-goal > div > div > div > div > div > div.ng-scope > div > ui-view > ga-wizard > div > div.ga-wizard-body > div.ga-wizard-steps > div > ga-wizard-step.ng-isolate-scope.ng-invalid.ng-invalid-required.ng-dirty.ng-valid-parse > div > div.ga-wizard-step-body > div.ga-wizard-step-contents > div > div:nth-child(3) > div.content.goals-wizard-goal-type-radios > ga-radiobutton:nth-child(4) > label > span.styled-radiobutton')).click();
                  //點擊 繼續
                  await driver.findElement(By.css('#ID-goal > div > div > div > div > div > div.ng-scope > div > ui-view > ga-wizard > div > div.ga-wizard-body > div.ga-wizard-steps > div > ga-wizard-step.ng-isolate-scope.ng-dirty.ng-valid-parse.ng-valid.ng-valid-required > div > div.ga-wizard-step-body > div.ga-wizard-step-buttons-container > button.btn.action.continueButton.ng-binding.ng-scope')).click();
                  await driver.sleep(1000);

                  //輸入 事件類別
                  await driver.findElement(By.xpath('//*[@id="ID-goal"]/div/div/div/div/div/div[2]/div/ui-view/ga-wizard/div/div[1]/div[1]/div/ga-wizard-step[3]/div/div[2]/div[1]/div/ga-event-goal-form/div/div[2]/table/tbody/tr[1]/td[3]/input')).sendKeys('event');
                  //輸入 動作
                  await driver.findElement(By.xpath('//*[@id="ID-goal"]/div/div/div/div/div/div[2]/div/ui-view/ga-wizard/div/div[1]/div[1]/div/ga-wizard-step[3]/div/div[2]/div[1]/div/ga-event-goal-form/div/div[2]/table/tbody/tr[2]/td[3]/input')).sendKeys(eve_name);
                  //點擊 儲存 按鈕
                  await driver.findElement(By.xpath('//*[@id="ID-goal"]/div/div/div/div/div/div[2]/div/ui-view/ga-wizard/div/div[1]/div[1]/div/ga-wizard-step[3]/div/div[2]/div[2]/button[1]')).click();                  
                  await driver.sleep(2000);
                }
            }

            //點擊返回
            await driver.sleep(1000);
            //切換回主要content
            await driver.switchTo().defaultContent();
            await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div[2]/section/div/div/div[1]/div/button')).click();


            //製作GA 的追蹤碼檔案
            //搞定目錄問題
            var dir = 'public/' + ga_site_name;
            var dir2 = 'public/' + ga_site_name + '/GA'
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }
            if (!fs.existsSync(dir2)) {
              fs.mkdirSync(dir2);
            }

            var filename_pv = dir2+'/pageview.txt';
            var pvcode1 = '<script async src="https://www.googletagmanager.com/gtag/js?id=' + code + '"></script><script>window.dataLayer = window.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "'+code+'");</script>';
            //將code存進txt中。
            await fs.writeFile(filename_pv, pvcode1, async (err) => {
              if (err) throw err;

            });
            if (parseInt(eve_num) > 0) {
                
                var dir = 'public/' + ga_site_name;
                var dir2 = 'public/' + ga_site_name + '/GA'
  
                for (var i = 1; i < parseInt(eve_num) + 1; i++) {
                  var noweve = "eve" + i;
                  var eve_name_obj = request.only(noweve);
                  var eve_name = eve_name_obj[noweve];
                  var someevent = "gtag('event', '" + eve_name + "', {'event_category': 'event','send_to': '" + code + "' });";
                  var file_evename = dir2+'/'+eve_name+'.txt';
                  //將事件code存進txt中。
                  await fs.writeFile(file_evename, someevent, async (err) => {
                    if (err) throw err;
                  });
                }

              }
        
        }finally{

          response.redirect('/login')
          return
        }

    }
    GA();



    // await next()
  }
}

module.exports = GaPv
