


// sanitize allowed domains
altDomains = altDomains.replace(/ /g,"");  // remove spaces
altDomains = altDomains.replace(/;/g,",");  // remove spaces
altdomains = altDomains.toLowerCase();
let domains = altDomains.split(',');


function _suggestEmail(){

  email = employee_email.toLowerCase() ;

  if ( _isValidDomain(email) ){
    getById("send_to_email").value = email;
  }

}

function _isValidDomain( email )
{

  if (domains.length == 0) return true;  // no domain setting

  let ret = false;

  for(let i = 0; i < domains.length; i++){
    if ( email.indexOf( domains[i]) > -1 ){
      getById("send_to_email").value = email;
      ret = true;
      break;
    } 
  } 
  return ret;
}

function _err_msg( msg ){

  let lbl = getById("err_msg");
  lbl.style.display = '';
  lbl.innerHTML = msg;
  setTimeout(function(){ lbl.style.display='none'; }, 5000); 

}

function email_ajax(params){

  let email = employee_email;   // actual employee email

  if ( isSendToAltEmail == "1" ){

    email = getById("send_to_email").value;  // input email
  
    if ( ! isEmailValid(email) ){
      _err_msg("Please input valid email address.");
      return;
    }

    // check domain
    if ( ! _isValidDomain(email) ){
      _err_msg("Email address domain is invalid.");
      return;
    }

  }
    
  xxhr("GET", "_payroll/pdf_print.php?pd="+params +"&ea="+email,
    function(msg){
      alert(msg);
    });

  alert('Please wait for a moment while sending an email to your email account.');  

}



