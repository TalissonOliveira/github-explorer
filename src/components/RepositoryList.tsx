import { useState, useEffect } from 'react'
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss'

interface Repository {
    id: number
    name: string
    description: string
    html_url: string
}

export function RepositoryList() {
    const [repositorys, setRepositorys] = useState<Repository[]>([])

    useEffect(() => {
        fetch('https://api.github.com/users/talissonoliveira/repos')
            .then(response => response.json())
            .then(data => setRepositorys(data))
    }, [])

    return (
        <section className="repository-list">
            <h1>List de repositórios</h1>

            <ul>
                {repositorys.map(repository => (
                    <RepositoryItem
                        key={repository.id} 
                        repository={repository}
                    />
                ))}
            </ul>
        </section>
    )
}