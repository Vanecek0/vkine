import React, { useEffect, useState } from 'react'
import tmdbApi from '../api/tmdbApi';


export const DepartmentsList = (type, language) => {
    const [departments, setDepartments] = useState([])

    const departmentsObject = () => {
        let departmentsRes = {};
        departments.map((item, key) => {
            departmentsRes[item.department] = [...item.jobs];
        })
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            const params = { language: language }
            const response = await tmdbApi.jobs({ params })
            setDepartments(response)

        }
        fetchDepartments()
    }, [language])


    return (
        departmentsObject()
    );
}