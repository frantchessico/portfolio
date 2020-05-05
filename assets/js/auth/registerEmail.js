(function() {
    
    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('password');
    const btnRegisterWithEmail = document.getElementById('btnRegisterWithEmail');
    const btnSign = document.getElementById('btnSign');
    const btnLogout = document.getElementById('btnLogout');
    const btnGoogle = document.getElementById('btnGoogle');
    const txtPhone = document.getElementById('txtPhone');
    const btnPhone = document.getElementById('btnPhone');
   
   

    // Sign in with Email and password:
    // btnRegisterWithEmail.addEventListener('click', e=> {
    //     e.preventDefault();

    //     const email = txtEmail.value;
    //     const password = txtPassword.value;
        
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .then(function (response) {

              


    //             firebase.auth().onAuthStateChanged(function(user) {
    //               user.sendEmailVerification(); 
    //             });
      
    //           const email = txtEmail.value;
    //          firebase.auth().currentUser.sendEmailVerification()
    //       .then(function () {
    //          console.log('Enviamos um email pra voce')
    //       }).catch(function (error) {
              
    //       });


          
    //           btnLogout.style.display = 'block';
    //           btnLogin.style.display = 'none';
    //           btnSign.style.display = 'none';
    //           console.log(response)
    //         })
    //         .catch(function (error) {
    //           console.log(error)
    //         });
    // });

    

    btnGoogle.addEventListener('click', e => {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
          .then(function (result) {
            firebase.auth().onAuthStateChanged(function(user) {
                user.sendEmailVerification(); 
              });
            btnLogout.style.display = 'block';
            btnLogin.style.display = 'none';
            btnSign.style.display = 'none';
            console.log(result)
          })
          .catch(function (error) {
            console.log(error)
          });
    })

    // btnLogout.addEventListener('click', e => {
    //   e.preventDefault();
    //   firebase.auth().signOut()
    //       .then(function () {
    //         btnLogout.style.display = 'none';
    //         btnLogin.style.display = 'block';
    //         btnSign.style.display = 'block';
    //       }).catch(function (error) {
    //          console.log('Error: ',error)
    //       });
    // })
})()