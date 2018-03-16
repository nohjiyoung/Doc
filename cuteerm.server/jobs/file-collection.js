var path = require('path');
var pdfUtil = require('pdf-to-text');
var WordExtractor = require("word-extractor");
var mammoth = require("mammoth");
var collectFiles= ('../service/file-service.js');
var schedule = require('node-schedule');
var { OFFICE_FILE_ROOT_PATH } = require('../constants');
var  addFiles  = require('../service/file-service');
const fs = require('fs');
var file_count=0;
var result=[];
var promisify = require('util').promisify;
var async = require('async');
var calls = [];

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
async function filewalker(dir, done) {

 await fs.readdir(dir, await promisify(function(err, list) {
    if (err){ 
        return done(err);
    }
      var pending = list.length;
      if (!pending||pending===0) 
          return done(null,dir);

           asyncForEach(list,function(file){
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat){              
                if (stat && stat.isDirectory()) {                         
                   filewalker(file,  done);
                } else {
                    if(stat){                    
                      var id=file.replace(/[^a-zA-Z ]/g, "_");                      
                      var filename = file.replace(/^.*[\\\/]/, '');
                      var extension=getFileExtension(file).toLowerCase();
                      var contents="";
                      
                      if(extension=="pdf"||extension=="docx"||extension=="doc"){                       
                          if(extension=="doc"){   
                              var extractor = new WordExtractor();
                              var extracted =  extractor.extract(file);
                              extracted.then(function(doc) {                          
                                  contents=doc.getBody();
                                  var one={                      
                                      name:filename,
                                      path:file,
                                      extension:extension,
                                      created:stat.birthtime,
                                      modified:stat.mtime,
                                      contents:contents
                                     };
                                     addToList(id,one)  ;  
                                    
                              });
                          }
                          if(extension=="docx"){  
                            var extracted=  mammoth.extractRawText({path: file});
                            extracted.then(function(result){
                                  contents= result.value; // The raw text   
                                  var one={                      
                                      name:filename,
                                      path:file,
                                      extension:extension,
                                      created:stat.birthtime,
                                      modified:stat.mtime,
                                      contents:contents
                                     };    
                                     addToList(id,one)  ;                                                     
                              })
                              .done();
                          }
                          if(extension=="pdf"){  
                              pdfUtil.pdfToText(upload.path, option, function(err, data) {
                                  if (err) throw(err);
                                     contents=data; //print text    
                                     var one={                      
                                      name:filename,
                                      path:file,
                                      extension:extension,
                                      created:stat.birthtime,
                                      modified:stat.mtime,
                                      contents:contents
                                     };
                                     addToList(id,one);
                                    
                                });
                          }                          
                      }
                    }        
                }
            });
        }).then(function(){
            if(result.length>0){
                console.log(result);
                addFiles(result);
                 result=[];
            }
        });
      
          
  }));
  
}
function addToList(id,obj){
    var index= { index:  { _index: 'resource', _type: 'file', _id:id } };     
    result.push(index);
    result.push(obj);
}

function getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}
function run()
{
    var schedule = require('node-schedule'); 
    var rule = new schedule.RecurrenceRule();   
    schedule.scheduleJob('*/59 * * * *', function(){  
        result=[];  
        var date = new Date();
        var current_hour = date.getDate();
        console.log('Collecting Files :'+ date);
    
            filewalker(OFFICE_FILE_ROOT_PATH, async function(err, data){
                if(err){   
                
                } else{
                   console.log("finished-"+data);
                }
            }); 
        }).invoke();
        console.log('invoked');
}
module.exports = run;

