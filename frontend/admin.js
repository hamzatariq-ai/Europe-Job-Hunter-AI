document.getElementById("jobForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const title = document.getElementById("title").value;
    const country = document.getElementById("country").value;
    const salary = document.getElementById("salary").value;
    const visa = document.getElementById("visa").value;

    const response = await fetch("http://127.0.0.1:8000/admin/add-job", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            country: country,
            salary: salary,
            visa: visa
        })
    });

    const data = await response.json();

    if(data.message === "Job Added Successfully"){

        alert("Job Added Successfully!");

        document.getElementById("jobForm").reset();

    }else{

        alert("Something went wrong.");

    }

});