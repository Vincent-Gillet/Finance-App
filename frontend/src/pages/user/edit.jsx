import React from 'react';

function EditUser() {
    return (
        <div className="container">
            <div className="subscribe">
                <form onSubmit={handleSubmit}>
                    <h1>Modifier votre profile</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">S'Inscrire</button>
                    <p>Vous avez déjà un compte ? <a href="/">Connectez-vous</a></p>
                </form>
            </div>
        </div>
    );
}

export default EditUser;