document.getElementById('login_btn').addEventListener('click',(e)=>{
    e.preventDefault();
    const emailPattern =/^(?!.\.\d)(?=[a-zA-Z0-9._%+-][a-zA-Z]{3,}\d*@)[a-zA-Z0-9._%+-]+@[a-z]{3,}\.[a-z]{2,}$/i;
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if(email.trim()==="" || email.trim() === null || !emailPattern.test(email) )
    {
        Swal.fire({
            icon: "error",
            position: 'center',
            text: "Email id is not in required format!",
            timer: 1500,
            showConfirmButton: false,
          });
    }
    else if(password.trim() === "" || password.trim() === null)
    {
        Swal.fire({
            icon: "error",
            position: 'center',
            text: "Password can't be empty string",
            timer: 1500,
            showConfirmButton: false,
          });
    }
    else
    {
       document.getElementById('login-form').submit();
    }
})