import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
 
export default function Error() {
    let nav = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            nav("/")
        }, 1000);
    }, [])
    return (
        <div>
            <h1>Page not found | 404 error</h1>
        </div>
    )
}
 
 