$(document).ready(()=>{
    $("#search-form").submit((e)=>{
        e.preventDefault()
        
        $("#load").html("Just a moment....")
        const location = $("#search-location").val()
        fetch("/weather?address="+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    $("#alert-box").removeClass("d-none")
                    $("#alert-box").addClass("alert-danger")
                    $("#result").html(data.error)
                    $("#load").addClass("d-none")
                }
                else{
                    $("#alert-box").removeClass("d-none")
                    $("#alert-box").addClass("alert-success")
                    $("#result").html("Location:- "+data.location)
                    $("#result2").html("Forecast:- "+data.forecast)
                    $(".icon").css('margin-top',-80)
                    $("#load").addClass("d-none")
                }
            })
        })
    })
})