const studentForm = document.querySelector("#student-form");
let studentsList = document.querySelector("#student-list");

let languageByName = document.getElementsByName("language")
let submitButton = document.querySelector(".submit")
let itLevelNum = document.createElement("label")

let localStudentsData = JSON.parse(localStorage.getItem("localStudentsData"))

itLevelNum.style.display = "inline"
itLevelNum.textContent = studentForm.score.value
studentForm.score.after(itLevelNum)
studentForm.score.addEventListener("input", () => {
    itLevelNum.textContent = studentForm.score.value
})
let oldData = null
let localOldData
let isSave = false
// let id = Math.random()
studentsDataOutput()
function studentsDataOutput() {
    const studentsData = [
        {
            studentName: "Jonas",
            lastName: "Jonaitis",
            age: 25,
            phone: 869748594,
            email: "Jonas@mail.com",
            score: 3,
            group: "FEU 4",
            languages: ["html", "css"],
            id: Math.random()
        },
        {
            studentName: "Jon",
            lastName: "Doe",
            age: 25,
            phone: 869848554,
            email: "Jon@mail.com",
            score: 2,
            group: "FEU 5",
            languages: ["css"],
            id: Math.random()
        },
        {
            studentName: "Rita",
            lastName: "Petriene",
            age: 28,
            phone: 86975818594,
            email: "Rita@mail.com",
            score: 3,
            group: "FEU 1",
            languages: ["css", "php"],
            id: Math.random()
        },
        {
            studentName: "Erika",
            lastName: "Smit",
            age: 29,
            phone: 868741025,
            email: "Erika@mail.com",
            score: 3,
            group: "FEU 2",
            languages: ["html", "php"],
            id: Math.random()
        },
        {
            studentName: "Edas",
            lastName: "Kota",
            age: 40,
            phone: 868505890,
            email: "Edas@mail.com",
            score: 5,
            group: "FEU 7",
            languages: ["html", "php", "js"],
            id: Math.random()
        }
    ]
    if (!localStudentsData) {
        localStudentsData = studentsData
        localStorage.setItem("localStudentsData", JSON.stringify(localStudentsData))
    }
}
localStudentsData.map(item => {
    studentsOutput(item);
})

function studentsOutput(studentData) {
    let { studentName, lastName, age, phone, email, score, group, languages } = studentData;
    let studentNameAndText = document.createElement("p")
    studentNameAndText.innerHTML = "Student name: " + studentName
    let lastNameAndText = document.createElement("p")
    lastNameAndText.innerHTML = "Last name: " + lastName
    let ageAndText = document.createElement("p")
    ageAndText.innerHTML = "Age: " + age
    let phoneAndText = document.createElement("p")
    phoneAndText.innerHTML = "Phone: **********"
    let emailAndText = document.createElement("p")
    emailAndText.innerHTML = "Email: **********"
    let scoreAndText = document.createElement("p")
    scoreAndText.innerHTML = "IT level: " + score
    let groupAndText = document.createElement("p")
    groupAndText.innerHTML = "Group: " + group


    let studentItem = document.createElement("div")
    studentItem.className = 'student-item'
    let privateInfoButton = document.createElement("button")
    privateInfoButton.textContent = "show secrets"
    let isShown = false;
    privateInfoButton.addEventListener("click", () => {
        if (!isShown) {
            privateInfoButton.textContent = "hide secrets"
            phoneAndText.textContent = "Phone: " + phone
            emailAndText.textContent = "Email: " + email
        } else {
            privateInfoButton.textContent = "show secrets"
            phoneAndText.textContent = "Phone: **********"
            emailAndText.textContent = "Email: **********"
        }
        isShown = !isShown
    })
    let delButton = document.createElement("button")
    delButton.textContent = 'delete Student'
    delButton.addEventListener("click", () => {
        studentItem.remove();
        localStudentsData = localStudentsData.filter(item => item.id !== localOldData.id)
        localStorage.setItem("localStudentsData", JSON.stringify(localStudentsData))

        let text = `Istrintas studentas (${studentName} ${lastName})`
        createdStudentText(text, "red")
    })
    let editButton = document.createElement("button")
    editButton.textContent = 'edit Student'
    editButton.addEventListener("click", () => {
        isSave = true
        setValuesInInputs(studentData)
        submitButton.value = "Save"
        oldData = studentItem
        localOldData = studentData
    })
    studentItem.append(
        studentNameAndText,
        lastNameAndText,
        ageAndText,
        phoneAndText,
        emailAndText,
        scoreAndText,
        groupAndText,
        privateInfoButton,
        delButton,
        editButton
    )
    let ulElement = document.createElement("ul")
    privateInfoButton.before(ulElement)
    ulElement.textContent = "Programming languages"
    languages.map(item => {
        let liElement = document.createElement("li")
        liElement.textContent += item
        ulElement.append(liElement)
    })

    if (!isSave) {
        studentsList.prepend(studentItem)

    } else {
        oldData.replaceWith(studentItem);
        let index = localStudentsData.findIndex(item => item.id === localOldData.id)
        localStudentsData[index] = studentData
        localStorage.setItem("localStudentsData", JSON.stringify(localStudentsData))
    }

}
function setValuesInInputs(studentData) {
    let { studentName, lastName, age, phone, email, score, group, languages } = studentData;
    studentForm.name.value = studentName
    studentForm["last-name"].value = lastName
    studentForm.age.value = age
    studentForm.score.value = score
    itLevelNum.textContent = score
    studentForm.phone.value = phone
    studentForm.email.value = email
    studentForm.group.value = group
    for (var i = 0; i < studentForm.language.length; i++) {
        if (languages.includes(studentForm.language[i].value)) {
            studentForm.language[i].checked = true;
        }

    }
}
function createdStudentText(text, color) {
    let createdStudentText = document.createElement("span")
    createdStudentText.innerHTML = text
    createdStudentText.style.color = color
    setTimeout(() => {
        createdStudentText.remove();
    }, 5000);
    studentForm.after(createdStudentText)
}
studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target
    requiredField(getStudentData(form))
})
function getStudentData(element) {
    let id = Math.random()
    let studentName = element.name.value
    let lastName = element.elements["last-name"].value;
    let age = element.age.value
    let phone = element.phone.value
    let email = element.email.value
    let score = element.score.value
    let group = element.group.value
    let language = element.language
    let languages = []
    language.forEach(item => {
        if (item.checked) {
            languages.push(item.value)
        }
    })
    let studentData = {
        studentName,
        lastName,
        age,
        phone,
        email,
        score,
        group,
        languages,
        id,
    }
    return studentData
}

studentForm.addEventListener("input", () => {
    localStorage.setItem("savedFormData", JSON.stringify(getStudentData(studentForm)));
})
const savedFormData = localStorage.getItem("savedFormData");
if (savedFormData) {
    const savedFormValues = JSON.parse(savedFormData);
    setValuesInInputs(savedFormValues)
}


function requiredField(studentData) {
    let { studentName, lastName, age, phone, email } = studentData;
    let requiredField = document.getElementsByClassName("required")
    let orAllRequiredField = true

    let allText = studentForm.querySelectorAll(".required-text")
    // Array.from(allText).map((element) => element.remove());
    let arr = [...allText].map((element) => element.remove());
    allRequiredTexts();
    function allRequiredTexts() {
        for (let i = 0; i < requiredField.length; i++) {
            if (!requiredField[i].value) {
                requiredTextF(requiredField[i], "Required field")
            }
        } if (orAllRequiredField) {
            if (studentName.length < 3) {
                requiredTextF(studentForm.name, "minimum  3 symbols")
            } if (lastName.length < 3) {
                requiredTextF(studentForm.elements["last-name"], "minimum  3 symbols")
            } if (age < 0) {
                requiredTextF(studentForm.age, "age need integer")
            } if (age > 120) {
                requiredTextF(studentForm.age, "max age 120")
            } if (phone.length < 9 || phone.length > 12) {
                requiredTextF(studentForm.phone, "incorrect number")
            } if (email.length < 8 || !email.includes("@") || !email.includes(".")) {
                requiredTextF(studentForm.email, "incorrect Email")
            }
        }
    }
    function requiredTextF(item, text) {
        let requiredText = document.createElement("span")
        requiredText.classList.add("required-text")
        requiredText.textContent = text
        requiredText.style.color = "red"
        item.style.borderColor = "red"
        item.after(requiredText)
        item.addEventListener("input", () => {
            requiredText.remove();
            item.style.borderColor = ""
        })
        orAllRequiredField = false
    }
    if (!orAllRequiredField) {
        let text = `Ne visi uzpildyti`
        createdStudentText(text, "red")
        return
    }

    let text = ""
    switch (isSave) {
        case (true):
            studentsOutput(studentData)
            text = `pakeistas studentas (${studentName} ${lastName})`
            submitButton.value = "Submit"
            isSave = false
            break;
        case (false):
            // studentData.id = Math.random()
            studentsOutput(studentData);
            text = `Sukurtas studentas (${studentName} ${lastName})`
            localStudentsData.push(studentData)
            localStorage.setItem("localStudentsData", JSON.stringify(localStudentsData))
    }
    createdStudentText(text, "green")
    studentForm.reset();
    localStorage.removeItem("savedFormData");
    itLevelNum.textContent = studentForm.score.value
}


// DEŠIMTA UŽDUOTIS:
// 1. Studento kūrimo ir redagavimo metu reikia sukurti visų studentų masyvą (tokiu pačiu formatu kaip ir initialData).
// 2. Šį masyvą pridėti į localStorage.
// 3. Puslapio perkrovimo metu iš localStorage esančio masyvo sukurti studentų sąrašą (pradinių studentų sukūrimo funkcionalumas).

// AŠTUNTA UŽDUOTIS (local storage):
// 1. Vedamą tekstą į input elementus išsaugoti į localStorage.
// 2. Perkrovus puslapį localStorage esančiomis reikšmėmis užpildyti input elementus.
// 3. Jeigu sukuriamas studentas, tai localStorage esančias reikšmes reikia išvalyti.


// SEPTINTA UŽDUOTIS:
// 1. Prie kiekvieno studento pridėti mygtuką, kurį paspaudus leistų redaguoti studento duomenis.
// 2. Redaguojant studentą, submit mygtuko tekstas turėtų pasikeisti į „Save Changes".
// 3. Pakeitus studento duomenis, turi iššokti <span> elementas, kuris informuoja apie studento duomenų redagavimą: „Studento (Vardas Pavardė) duomenys sėkmingai pakeisti". Šis span elementas dingsta po 5 sekundžių.

// ŠEŠTA UŽDUOTIS:
// 1. Sukurti pradinius duomenų masyvą, kuriame būtų bent 5 studentų duomenys (objektų formatu).
// 2. Sukurti funkciją, kuri priima šiuos duomenis ir užkrovus puslapį į ekraną iškart išveda duomenis iš šio masyvo.

// PAPILDOMA UŽDUOTIS (formos validacija naudojant JavaScript):
// Papildyti formos validaciją. Jeigu:
// 1. Vardas yra trumpesnis nei 3 simboliai, parašyti: „Vardas privalo būti bent 3 simbolių ilgumo".
// 2. Pavardė yra trumpesnė nei 3 simboliai, parašyti: „Pavardė privalo būti bent 3 simbolių ilgumo".
// 3. Amžius yra neigamas, parašyti: „Amžius privalo būti teigiamas skaičius".
// 4. Amžius yra daugiau nei 120 metų, parašyti: „Įvestas amžius yra per didelis".
// 5. Telefono numeris yra mažiau nei 9 arba daugiau nei 12 simbolių, parašyti: „Įvestas telefono numeris yra neteisingas".
// 6. Elektroninis paštas yra trumpesnis nei 8 simboliai ir jame nėra panaudotas @ ir . simboliai, parašyti: „Įvestas elektroninis paštas yra neteisingas".

// PENKTA UŽDUOTIS (formos validacija naudojant JavaScript):
// 1. Priduodant formą (submit) patikrinti ar privalomi laukeliai nėra tušti.
// 2. Jeigu bent vienas privalomas formos laukelis yra tuščias:
//     2.1. Formos alert žinutėje reikia parašyti, jog ne visi laukeliai yra užpildyti. Šis tekstas turi būti raudonos spalvos.
//     2.2. Kiekvienas privalomas input laukelis, kuris nėra užpildytas:
//         2.2.1. Turi būti apvestas raudonu rėmeliu.
//         2.2.2. Šalia laukelio turi būti parašytas raudonas tekstas: „Šis laukelis yra privalomas".

// KETVIRTA DALIS (studento ištrynimas):
// 1. Prie kiekvieno sukurto studento elemento pridėti mygtuką „Ištrinti studentą".
// 2. Paspaudus šį mygtuką, studento elementas yra ištrinamas.
// 3. Ištrynus studentą, turi iššokti <span> elementas, kuris informuoja apie studento ištrynimą: „Studentas (Vardas Pavardė) sėkmingai ištrintas.". Šis span elementas dingsta po 5 sekundžių.


// 7. Range reikšmės atvaizdavimas naujame elemente.
// 6. Sukūrus studentą, turi iššokti <span> elementas, kuris informuoja apie studento sukūrimą: „Sukurtas studentas (Vardas Pavardė)". Šis span elementas dingsta po 5 sekundžių.

// TREČIA DALIS:
// 1. Vietoje el. pašto rodyti tik žvaigždutes „****".
// 2. Kiekviename „student-item" elemente sukurti mygtuką „Rodyti asmens duomenis".
// 3. Paspaudus šį mygtuką:
//     3.1. Parodyti to studento el. paštą.
//     3.2. Pakeist mygtuko tekstą į „Slėpti asmens duomenis".
// 4. Jeigu asmens duomenys yra rodomi, tai paspaudus mygtuką:
//     4.1. Paslėpti asmens el. paštą.
//     4.2. Mygtuko tekstą pakeisti į „Rodyti asmens duomenis".

// ANTRA DALIS:
// 1. Sukurti div elementą, kuris turės id „students-list".
// 2. Kiekvieną kartą pridavus formą (submit), turi būti sukurtas naujas div elementas su klase „student-item" ir pridedamas į „students-list" elemento pradžią.
// 3. Duomenys apie studentą turi būti įdėti į „student-item" elementą.
// 4. Formoje pridėti „checkbox" tipo input'ą, kuriame pateikta galimybę rinktis iš dominančių programavimo kalbų.
// 5. Dominančias programavimo kalbas atvaizduoti „student-item" elemente.