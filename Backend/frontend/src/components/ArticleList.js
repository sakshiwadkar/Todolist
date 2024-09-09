import React from 'react';
import APIService from '../components/APIService';

function ArticleList(props) {
    const editArticle = (article) => {
        props.editArticle(article);
    };

    const deleteArticle = (article) => {
        APIService.DeleteArticle(article.id)
            .then(() => props.deleteArticle(article));
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Assigned To</th>
                        <th scope="col">Status</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.articles && props.articles.map(article => (
                        <tr key={article.id}>
                            <td>{article.assigned_to}</td>
                            <td>{article.status}</td>
                            <td>{article.due_date}</td>
                            <td>{article.priority}</td>
                            <td>{article.comments}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Article Actions">
                                    <button className="btn btn-primary" onClick={() => editArticle(article)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteArticle(article)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArticleList;
