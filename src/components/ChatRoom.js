import React, {useState, useRef} from 'react'

const ChatRoom = () => {
    const dummy = userRef();
    const messageRef = firestore.collection('messages'); //reference a firestore collection
    const query = messageRef.orderby('createdAt').limit(25); //query documents in a collection

    const [message] = useCollectionData(query, { idField: 'id' }); //listen to data with a -hook-
    const [formValue, setFormValue] = useState('');
    return (
        <>
            <div>
                //loop each document - map array of message and each message I used a dedicated ChatMessage component that has a key props with msg.id and pass the document data as message props
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/> )} //sakit sa bangs nito repapips
            </div>
        </>
    )
}
