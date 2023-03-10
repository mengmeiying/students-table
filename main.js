const arrayOfStudents = [
    {
        name: "Леонид",
        surname: "Леонидов",
        patronymic: "Леонидович",
        birthdate: "1995-06-15",
        startyear: 2015,
        faculty: "Медицинский"
    },
    {
        name: "Александр",
        surname: "Александров",
        patronymic: "Александрович",
        birthdate: "1990-01-01",
        startyear: 2010,
        faculty: "Авиационный"
    },

    {
        name: "Юрий",
        surname: "Юрьев",
        patronymic: "Юрьевич",
        birthdate: "2000-12-31",
        startyear: 2020,
        faculty: "Химический"
    }
]

document.addEventListener('DOMContentLoaded', function () {

    function createTable(arrayOfStudents) {
        const table = document.querySelector('.table-data');
        table.textContent = "";

        for (let student of arrayOfStudents) {
            const tr = document.createElement('tr');

            const tdName = document.createElement('td');
            tdName.textContent = `${student.surname} ${student.name} ${student.patronymic}`;
            tr.appendChild(tdName);

            const tdFaculty = document.createElement('td');
            tdFaculty.textContent = `${student.faculty}`;
            tr.appendChild(tdFaculty);

            function getBirthDate() {
                const dateOfBirth = new Date(student.birthdate);
                let dayOfBirth = dateOfBirth.getDate();
                if (dayOfBirth < 10) dayOfBirth = `0${dayOfBirth}`;

                let monthOfBirth = dateOfBirth.getMonth();
                if (monthOfBirth < 10) {
                    monthOfBirth = `0${monthOfBirth + 1}`;
                } else monthOfBirth++;

                const age = Math.trunc((Date.now() - Date.parse(dateOfBirth)) / 1000 / 60 / 60 / 24 / 365);
                return `${dayOfBirth}.${monthOfBirth}.${dateOfBirth.getFullYear()} (${age} лет)`
            }

            const tdBirthdate = document.createElement('td');
            tdBirthdate.textContent = getBirthDate();
            tr.appendChild(tdBirthdate);

            function getStudentYears() {
                const date = new Date();
                const currentYear = date.getFullYear();
                const currentMonth = date.getMonth();
                let course;
                let didEndLearning = false;

                if (currentMonth < 8) {
                    //если сентябрь не прошёл
                    course = currentYear - student.startyear;
                }
                else {
                    //если сентябрь прошёл
                    course = currentYear - student.startyear + 1;
                }

                if (course > 4) {
                    didEndLearning = true;
                }


                if (didEndLearning) {
                    return `${student.startyear} - ${student.startyear + 4} (закончил)`;
                }
                else {
                    return `${student.startyear} - ${student.startyear + 4} (${course} курс)`;
                }
            }

            const tdYears = document.createElement('td');
            tdYears.textContent = getStudentYears();
            tr.appendChild(tdYears);

            table.appendChild(tr);
        }
    }
    createTable(arrayOfStudents);

    const addButton = document.querySelector('.add-button');
    const nameInput = document.querySelector('.input--name');
    const surnameInput = document.querySelector('.input--surname');
    const patronymicInput = document.querySelector('.input--patronymic');
    const birthdateInput = document.querySelector('.input--birthdate');
    const startyearInput = document.querySelector('.input--startyear');
    const facultyInput = document.querySelector('.input--faculty');
    const errorField = document.querySelector('.error-field');

    function createStudent() {
        const student = {};
        student.name = nameInput.value;
        student.surname = surnameInput.value;
        student.patronymic = patronymicInput.value;
        student.birthdate = birthdateInput.value;
        student.startyear = Number(startyearInput.value);
        student.faculty = facultyInput.value;

        console.log(student);
        return student;
    }

    function validateDataInput() {
        let isInputCorrect = true;
        function validateNameInput() {
            const nameInputError = document.querySelector('.error-text--name');
            if (nameInput.value.trim(' ').length <= 1) {
                nameInput.classList.add('error');
                isInputCorrect = false;
                nameInputError.classList.add('error-text--active');

                nameInput.addEventListener('blur', validateNameInput);
            }
            else {
                nameInput.classList.remove('error');
                nameInputError.classList.remove('error-text--active');
                nameInput.removeEventListener('blur', validateNameInput);
            }
        }
        
        function validateSurnameInput() {
            const surnameInputError = document.querySelector('.error-text--surname');
            if (surnameInput.value.trim(' ').length <= 1) {
                surnameInput.classList.add('error');
                isInputCorrect = false;
                surnameInputError.classList.add('error-text--active');
                surnameInput.addEventListener('blur', validateSurnameInput);
            }
            else {
                surnameInput.classList.remove('error');
                surnameInputError.classList.remove('error-text--active');
                surnameInput.removeEventListener('blur', validateSurnameInput);
            }
        }

        function validatePatronymicInput() {
            const patronymicInputError = document.querySelector('.error-text--patronymic');
            if (patronymicInput.value.trim(' ').length <= 1) {
                patronymicInput.classList.add('error');
                isInputCorrect = false;
                patronymicInputError.classList.add('error-text--active');
                patronymicInput.addEventListener('blur', validatePatronymicInput);
            }
            else {
                patronymicInput.classList.remove('error');
                patronymicInputError.classList.remove('error-text--active');
                patronymicInput.removeEventListener('blur', validatePatronymicInput);
            }
        }

        function validateDateofbirthInput() {
            const dateOfBirth = new Date(birthdateInput.value);

            const birthdateInputErrorEmpty = document.querySelector('.error-text--birthdate-empty');
            const birthdateInputErrorLess = document.querySelector('.error-text--birthdate-less');
            const birthdateInputErrorMore = document.querySelector('.error-text--birthdate-more');
            birthdateInput.addEventListener('blur', validateDateofbirthInput);
            if (birthdateInput.value.trim(' ').length <= 0) {
                birthdateInput.classList.add('error');
                isInputCorrect = false;
                birthdateInputErrorEmpty.classList.add('error-text--active');
                birthdateInputErrorLess.classList.remove('error-text--active');
                birthdateInputErrorMore.classList.remove('error-text--active');
            }
            else if (Date.now() < Date.parse(dateOfBirth)) {
                birthdateInput.classList.add('error');
                isInputCorrect = false;
                birthdateInputErrorLess.classList.add('error-text--active');
                birthdateInputErrorEmpty.classList.remove('error-text--active');
                birthdateInputErrorMore.classList.remove('error-text--active');
            }
            else if (dateOfBirth.getFullYear() < 1990) {
                birthdateInput.classList.add('error');
                isInputCorrect = false;
                birthdateInputErrorMore.classList.add('error-text--active');
                birthdateInputErrorEmpty.classList.remove('error-text--active');
                birthdateInputErrorLess.classList.remove('error-text--active');
            }
            else {
                birthdateInput.classList.remove('error');
                birthdateInputErrorEmpty.classList.remove('error-text--active');
                birthdateInputErrorLess.classList.remove('error-text--active');
                birthdateInputErrorMore.classList.remove('error-text--active');
                birthdateInput.removeEventListener('blur', validateDateofbirthInput);
            }
        }

        function validateStartyearInput() {
            const date = new Date();
            const currentYear = date.getFullYear();
            const startyearInputErrorEmpty = document.querySelector('.error-text--startyear-empty');
            const startyearInputErrorWrong = document.querySelector('.error-text--startyear-wrong');
            startyearInput.addEventListener('blur', validateStartyearInput);
            if (startyearInput.value.trim(' ').length <= 1) {
                startyearInput.classList.add('error');
                isInputCorrect = false;
                startyearInputErrorEmpty.classList.add('error-text--active');
                startyearInputErrorWrong.classList.remove('error-text--active');
            }
            else if (startyearInput.value < 2000 || startyearInput.value > currentYear) {
                startyearInput.classList.add('error');
                isInputCorrect = false;
                startyearInputErrorWrong.classList.add('error-text--active');
                startyearInputErrorEmpty.classList.remove('error-text--active');
            }
            else {
                startyearInput.classList.remove('error');
                startyearInputErrorEmpty.classList.remove('error-text--active');
                startyearInputErrorWrong.classList.remove('error-text--active');
                startyearInput.removeEventListener('blur', validateStartyearInput);
            }
        }

        function validateFacultyInput() {
            const facultyInputError = document.querySelector('.error-text--faculty');
            if (facultyInput.value.trim(' ').length <= 1) {
                facultyInput.classList.add('error');
                isInputCorrect = false;
                facultyInputError.classList.add('error-text--active');
                facultyInput.addEventListener('blur', validateFacultyInput);
            }
            else {
                facultyInput.classList.remove('error');
                facultyInputError.classList.remove('error-text--active');
                facultyInput.removeEventListener('blur', validateFacultyInput);
            }
        }
        
        validateNameInput();
        validateSurnameInput();
        validatePatronymicInput();
        validateDateofbirthInput();
        validateStartyearInput();
        validateFacultyInput();

        return isInputCorrect;
    }

    function clearTable() {
        nameInput.value = '';
        surnameInput.value = '';
        patronymicInput.value = '';
        birthdateInput.value = '';
        startyearInput.value = '';
        facultyInput.value = '';
    }

    function validateText(e) {
            let value = e.target.value;
            value = value.match(/[А-Яа-я\-\s]/g);
            value = value ? value.join('') : ''
        
        
            e.target.value = value;
    }

    function formatText(e) {
        let value = e.target.value;
        value = value.trim().replace(/\s+/g, ' ').replace(/-+/g, '-');
        value = value.substring(0,1).toUpperCase() + value.substring(1, value.length).toLowerCase();
    
        e.target.value = value;
    }

    const textInputs = [nameInput, surnameInput, patronymicInput, facultyInput];
    textInputs.forEach(e => e.addEventListener('input', validateText, e));
    textInputs.forEach(e => e.addEventListener('blur', formatText, e))

    addButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (validateDataInput()) {
            const student = createStudent();
            arrayOfStudents.push(student);

            clearTable();
            createTable(arrayOfStudents);
        }


    })

    const headingName = document.querySelector('.heading--name');
    const headingFaculty = document.querySelector('.heading--faculty');
    const headingDate = document.querySelector('.heading--date');
    const headingYears = document.querySelector('.heading--years');

    headingName.addEventListener('click', function () {
        const sortedArray = arrayOfStudents.sort(function (a, b) {
            const aName = `${a.surname} ${a.name} ${a.patronymic}`;
            const bName = `${b.surname} ${b.name} ${b.patronymic}`;
            if (aName > bName) {
                return 1;
            }
            if (aName < bName) {
                return -1;
            }
            return 0;
        })
        createTable(sortedArray)
    })

    headingFaculty.addEventListener('click', function () {
        const sortedArray = arrayOfStudents.sort(function (a, b) {
            if (a.faculty > b.faculty) {
                return 1;
            }
            if (a.faculty < b.faculty) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        })
        createTable(sortedArray)
    })

    headingDate.addEventListener('click', function () {
        const sortedArray = arrayOfStudents.sort(function (a, b) {
            const aDate = Date.parse(a.birthdate);
            const bDate = Date.parse(b.birthdate);
            if (aDate > bDate) {
                return 1;
            }
            if (aDate < bDate) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        })
        createTable(sortedArray)
    })

    headingYears.addEventListener('click', function () {
        const sortedArray = arrayOfStudents.sort(function (a, b) {
            if (a.startyear > b.startyear) {
                return 1;
            }
            if (a.startyear < b.startyear) {
                return -1;
            }
            return 0;
        })
        createTable(sortedArray)
    })

    function filterByName(el) {
        const filterInputName = document.querySelector('.input--fullname-filter');
        if (filterInputName.value) {
            return el.name.includes(filterInputName.value) || el.surname.includes(filterInputName.value) || el.patronymic.includes(filterInputName.value);
        }
        return true;
    }

    function filterByStartYear(el) {
        const filterInputStartYear = document.querySelector('.input--startyear-filter');
        if (filterInputStartYear.valueAsNumber){
            return el.startyear === filterInputStartYear.valueAsNumber;
        }
        return true;
    }

    function filterByEndYear(el) {
        const filterInputEndYear = document.querySelector('.input--endyear-filter');
        if (filterInputEndYear.valueAsNumber){
            return el.startyear+4 === filterInputEndYear.valueAsNumber;
        }
        return true;
    }

    function filterByFaculty(el) {
        const filterInputFaculty = document.querySelector('.input--faculty-filter');
        if (filterInputFaculty.valueAsNumber){
            return el.faculty === filterInputFaculty.value;
        }
        return true;
    }

    const filterButton = document.querySelector('.filter-button');
    
    
    
    
    filterButton.addEventListener('click', function (e) {
        e.preventDefault();
        let filteredArray = arrayOfStudents.filter(filterByName).filter(filterByStartYear).filter(filterByEndYear).filter(filterByFaculty);
        createTable(filteredArray);
    })
})