var util = require("util");
var AWS = require("aws-sdk");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;
var S3Form = require("../s3post").S3Form;
var AWS_CONFIG_FILE = "config.json";
var POLICY_FILE = "policy.json";
var succ = "success.ejs";

var message= "";
var haderr= false


var task = function(request, callback){
	//1. загрузка конфигурации
	AWS.config.loadFromPath(AWS_CONFIG_FILE);
	var s3 = new AWS.S3();
	var klucz = request.param("klucz");
	
	var opcje = {
			Bucket: 'serhii.chystikov',
			Key : klucz
	};

   
	s3.deleteObject(opcje, function(err,data){
	if(err){
		message = "Failed to delete file "+klucz.substring(8);
		callback(null, {template: succ, params:{message:message}});
		}
	else{
		 message = "File removed : " +klucz.substring(8);
		 callback(null, {template: succ, params:{message:message}});
		
	}});
	
	

		
	
	}
	exports.action = task;
