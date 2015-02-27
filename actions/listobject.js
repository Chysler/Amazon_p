var util = require("util");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;
var S3Form = require("../s3post").S3Form;
var AWS_CONFIG_FILE = "config.json";
var POLICY_FILE = "policy.json";
var template = "list.ejs";
var AWS = require("aws-sdk");


var task = function(request, callback){
	
	AWS.config.loadFromPath(AWS_CONFIG_FILE);
	var S3 = new AWS.S3();
    var fields = []; 
    var nazwy =[];
    var adresy =[];
	var params = {
		      Bucket: 'serhii.chystikov', /* required */
			 
			  
			};
	S3.listObjects(params, function(err, data) {
	
	 if (err) console.log(err, err.stack); // an error occurred
	 else     
		 {
		 	
		 	for(var i=0; i<data.Contents.length;i++)
		 		{
		 			fields[i] = data.Contents[i].Key;
		 		}
		 	for(var i=0; i<data.Contents.length;i++)
		 		{
		 			nazwy[i] = data.Contents[i].Key.substring(8);
					S3.getSignedUrl('getObject', params={Bucket: 'serhii.chystikov',Key:data.Contents[i].Key}, function (err, url) {
				adresy[i]=url;
		});
		 		}
      callback(null, {template: template, params:{fields:fields, bucket:"serhii.chystikov",names:nazwy,adresy:adresy}});
	}});
	
	}
	exports.action = task;
