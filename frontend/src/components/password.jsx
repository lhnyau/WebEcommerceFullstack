const response = await fetch('http://localhost:1337/api/auth/change-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_JWT_TOKEN'
    },
    body: JSON.stringify({
      currentPassword: 'current-password',
      password: 'new-password',
      passwordConfirmation: 'new-password'
    })
  });
  
  const data = await response.json();