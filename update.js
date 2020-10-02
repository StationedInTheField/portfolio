const axios = require('axios').default;
const fs = require('fs');

async function start(){
  let repositories = await axios.get('https://api.github.com/users/QuestNetwork/repos');
  let apiPackages = [];
  for( let repo of repositories['data']){
    //crawling first repo
    try{
      let name = repo['full_name'];
      let readme = await axios.get('https://raw.githubusercontent.com/'+name+'/master/README.md');
      readme = readme['data'];
      //
      if(readme.replace(new RegExp(/## /, 'g'),'').indexOf(' # ') < 0){
        readme = readme.replace(new RegExp(/## /, 'g'),'# ');
      }

      newReadme = "";
      readmeA = readme.split(new RegExp(/https:\/\/github.com\/QuestNetwork\//, 'g'));
      for(let r of readmeA){
        if(r.split('(')[0].split(')')[0].indexOf('/') > -1){
          newReadme += 'https:\/\/github.com\/QuestNetwork\/' + r;
        }
        else{
            newReadme += r;
        }
      }

      if(newReadme.length > 0){
        readme = newReadme;
      }

      //strip funding and license
      let parts = readme.split('\n# ');
      let result = [];
      for(let p of parts){

        if(p.indexOf('API') == 0){
          apiPackages.push(p.replace(new RegExp(/API/, 'g'),repo['full_name']))
        }

        if( p.indexOf('Download') != 0 && p.indexOf('Web Demo') != 0 && p.indexOf('Support Us') != 0 && p.indexOf('License') != 0 && p.indexOf('Development') != 0 && p.indexOf('Lead Maintainer') != 0 && p.indexOf('API') != 0 && p.indexOf('Security') != 0){
          result.push(p);
        }
        else if(name == 'QuestNetwork/qDesk'){
          emulatedSection = "# "+p;
          let headerToFileName = p.split('\n')[0].toLowerCase().replace(new RegExp(/ /, 'g'),'-');
          fs.writeFileSync('docs/'+headerToFileName+'.md',emulatedSection,{encoding:'utf8',flag:'w'});
        }



      }
      readme = result.join('\n# ');



      // readme = readme.replace()
      fs.writeFileSync('docs/'+name.split('/')[1]+'.md',readme,{encoding:'utf8',flag:'w'})
    }catch(e){
    // console.log(e)
    }
  }

  let apiReadme =  '\n# ' + apiPackages.join('# ');
  console.log(apiPackages.length);
  // console.log(apiReadme);
  fs.writeFileSync('docs/api.md',apiReadme,{encoding:'utf8',flag:'w'});

    let license = await axios.get('https://raw.githubusercontent.com/QuestNetwork/qDesk/master/LICENSE');
    fs.writeFileSync('docs/license.md',license['data'],{encoding:'utf8',flag:'w'})


    //fix sidebar
    let sidebar = fs.readFileSync('docs/_sidebar.md').toString('utf8');
    let sidebar0 = sidebar.split('- Library Modules\n')[0];
    let sidebar2 = '(license.md)';
    let sidebar1 = "";
    // let libmodules = [];
    for(let repo of repositories['data']){
      if(repo['full_name'].indexOf('QuestNetwork/quest-') > -1 && repo['full_name'] != 'QuestNetwork/quest-os-js'){
        // libmodules.push(repo['fullName'].split('/')[1]);
        //check if readme exists
        try{
          let readme = await axios.get('https://raw.githubusercontent.com/'+repo['full_name']+'/master/README.md');
          if(readme['data'].length > 160){
            sidebar1 += "\n  + ["+repo['full_name'].split('/')[1] + "]("+repo['full_name'].split('/')[1]+")";
          }


        }
        catch(e){}

      }
    }

    console.log(sidebar2);
    fileContents = sidebar0 + '- Library Modules\n' + sidebar1 + '\n - [License]' + sidebar2;
    fs.writeFileSync('docs/_sidebar.md',fileContents,{encoding:'utf8',flag:'w'})



}

start();
