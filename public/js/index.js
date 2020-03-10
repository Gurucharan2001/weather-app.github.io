$(document).ready(()=>{
    $("#search-form").submit((e)=>{
        e.preventDefault()

        const location = $("#search-location").val()
        fetch("http://localhost:3000/weather?address="+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    $("#alert-box").removeClass("d-none")
                    $("#alert-box").addClass("alert-danger")
                    $("#result").html(data.error)
                    $(".icon").css('margin-top',-40)
                    location.reload()
                }
                else{
                    $("#alert-box").removeClass("d-none")
                    $("#alert-box").addClass("alert-success")
                    $("#result").html("Location:- "+data.location)
                    $("#result2").html("Forecast:- "+data.forecast)
                    $(".icon").css('margin-top',-80)
                }
            })
        })
    })
})