$("#form").submit(function(e) {
    e.preventDefault();
});

$("#button").click(function (){
    $.post("",
        {
            user: $("#user").val(),
            password: $("#password").val()
        },
        function(data, status) {
            if (data.trim() === "password") {
                return alert("password is wrong.");
            } else if (data.trim() === "user") {
                return alert("user does not exist.");
            } else {
                return window.location.replace(data);
            }
        }
    );
});
