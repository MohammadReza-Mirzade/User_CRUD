$("#form").submit(function(e) {
    e.preventDefault();
});

console.log(0);

$("#button").click(function (){
    $.post("",
        {
            passwordL: $("#password-0").val(),
            password: $("#password").val(),
            email: $("#email").val()
        },
        function(data, status) {
            console.log(1);
            if (data === 'password') {
                return alert('Password is wrong.');
            } else {
                return location.reload();
            }
        }
    );
});
