# Front-end-Node-Ng-Chat

Hello and welcome to the Front-end part of my first and ongoing Node/Angular Chat

## Install

- To install the following project, start by cloning or downloading it 

- Once you are in the project folder in your computer :

```bash
npm install
```

## Run the Angular Server 

```bash
ng serve
```

## Open your favourite browser (obviously Firefox)

Navigate to your favourite [localhost](http://localhost:4200)

### Chat usage for now 

* You have to register (at least) two users to be able to chat between them. Consider the following:
    * Two users cannot have the same email
    * A few validators are here and there, so : 
        * name and firstname cannot exceed 30 characters
        * password can contain uppercase and lower case characters, as well as **!$@#**, but must be between 6 and 20 characters
        * every field is mandatory, but there isn't any real mail verification yet, so you can put **example@mail.com** if you want to

* Once your user/users have registered, you have to login to access the chat fonctionnality, so at home, do not pick too complicated mails or passwords
as you will have to type them again
* Consider logging in two different users : One in a classic window, one in a private window
* Once logged, you can see all the existing users under the 'Users' tab, and click on one to chat with him !

## Disclaimer 

- Not much style at the moment, mostly trying to make it work

- Plenty of functionnalities still under work/review, evrything might not work as expected, feel free to contact me !

## Link to the Back-end, in case you missed it 

[Here you go](https://github.com/JacquesDurand/Back-end-Node-NG-chat)
