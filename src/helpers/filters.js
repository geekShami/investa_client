import  Vue  from  "vue";





Vue.filter("currency",  function(value)  {
    if  (!value)  {
      return  "";
    }
    return Number(value).toLocaleString('en-IN');
    
  });