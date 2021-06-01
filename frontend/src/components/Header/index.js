import React from 'react'

export default function Header(){
    return (
        <div className="navbar navbar-expand-lg justify-content-center bg-dark navbar-dark">
            <ul className="navbar-nav ml-3">
                <li className="btn"><a href="/"><i className="material-icons mt-3" style={{color: 'white'}}>undo</i></a><a className="nav-link" href="/">Retornar</a></li>
            </ul>
        </div>
    )
}