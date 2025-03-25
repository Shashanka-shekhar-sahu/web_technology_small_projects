let employees=[{"id":1,"first_name":"Gian","last_name":"Alison","email":"galison0@salon.com","gender":"Male","country":"Russia"},
{"id":2,"first_name":"Nollie","last_name":"Fryman","email":"nfryman1@multiply.com","gender":"Male","country":"China"},
{"id":3,"first_name":"Patricia","last_name":"Holborn","email":"pholborn2@ucsd.edu","gender":"Female","country":"Indonesia"},
{"id":4,"first_name":"Othello","last_name":"Seeley","email":"oseeley3@skype.com","gender":"Male","country":"France"},
{"id":5,"first_name":"Alec","last_name":"Saddington","email":"asaddington4@jimdo.com","gender":"Male","country":"Portugal"}];

let allEmpsBtn=document.querySelector('#all-emps');
let maleEmpsBtn=document.querySelector('#male-emps');
let femaleEmpsBtn=document.querySelector('#female-emps');

//display employees
function displayEmployees(emps)
{
    if(emps.length>0)
    {
        let eachEmp=``;
        for(let emp of emps)
        {
            eachEmp+=`<tr>
            <td>${emp.id}</td>
            <td>${emp.first_name}</td>
            <td>${emp.last_name}</td>
            <td>${emp.email}</td>
            <td>${emp.gender}</td>
            <td>${emp.country}</td>
        </tr>`
        }

        document.querySelector('tbody').innerHTML=eachEmp;
    }
};


let maleEmps=employees.filter((emp)=>
{
    return emp.gender==="Male";
});

let femaleEmps=employees.filter((emp)=>
{
    return emp.gender==="Female";
});

allEmpsBtn.addEventListener('click',()=>
{
    displayEmployees(employees);
});

maleEmpsBtn.addEventListener('click',()=>
{
    displayEmployees(maleEmps);
})

femaleEmpsBtn.addEventListener('click',()=>
{
    displayEmployees(femaleEmps);
});


let formSubmitBtn=document.querySelector('#form-submit');
let inputEl=document.querySelector('#emp');

formSubmitBtn.addEventListener('submit',function(event)
{
    event.preventDefault();//stop automatic form submission
    let enteredName=inputEl.value;
    let filteredEmployees=filterEmps(enteredName,employees);
    displayEmployees(filteredEmployees);

    inputEl.value="";
    
});


function filterEmps(val,arr)
{
    val=val.toUpperCase().trim();
    let emps=[];

    for(let emp of arr)
    {
        let oName=emp.first_name.toUpperCase().trim();

        if(oName.includes(val))
        {
            emps.push(emp);
        }
    }

    return emps;
}
