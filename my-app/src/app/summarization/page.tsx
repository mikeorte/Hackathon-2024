function MiniSummary (props: any) {
    let text = props.text;
    let day = props.day;
    let subject = props.subject;
    
    if (text === undefined) {
        text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris augue neque. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Risus sed vulputate odio ut enim blandit volutpat maecenas. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Orci nulla pellentesque dignissim enim sit amet. Tempor orci dapibus ultrices in iaculis nunc sed. Nulla aliquet enim tortor at auctor urna. Tristique senectus et netus et malesuada fames. Mauris a diam maecenas sed enim ut. Et netus et malesuada fames ac turpis. Parturient montes nascetur ridiculus mus. Egestas integer eget aliquet nibh praesent tristique. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Nulla pharetra diam sit amet nisl suscipit. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Lectus mauris ultrices eros in cursus turpis. Varius morbi enim nunc faucibus a. Dictum non consectetur a erat nam at lectus urna duis. Pellentesque dignissim enim sit amet venenatis urna. Urna neque viverra justo nec. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam. At ultrices mi tempus imperdiet nulla malesuada. Fringilla urna porttitor rhoncus dolor purus non enim. Vulputate dignissim suspendisse in est ante in nibh. Porta lorem mollis aliquam ut porttitor leo. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Non blandit massa enim nec dui nunc mattis enim. Egestas dui id ornare arcu odio ut sem nulla pharetra. Odio ut sem nulla pharetra. Elementum facilisis leo vel fringilla. Dui nunc mattis enim ut tellus elementum. Vivamus arcu felis bibendum ut tristique et. Justo eget magna fermentum iaculis. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Est velit egestas dui id ornare arcu odio. A erat nam at lectus urna duis convallis convallis. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Ornare aenean euismod elementum nisi quis eleifend quam. Sit amet consectetur adipiscing elit. Elementum tempus egestas sed sed. Volutpat est velit egestas dui. Neque viverra justo nec ultrices dui sapien eget mi. Tincidunt ornare massa eget egestas. Dolor morbi non arcu risus quis. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Pharetra vel turpis nunc eget lorem. Ut lectus arcu bibendum at varius vel pharetra. Aliquet lectus proin nibh nisl condimentum id venenatis a. Sodales ut eu sem integer vitae justo eget magna. Ut lectus arcu bibendum at varius vel pharetra vel. Gravida cum sociis natoque penatibus et magnis dis parturient montes. At varius vel pharetra vel. Massa sapien faucibus et molestie ac feugiat sed. Quis viverra nibh cras pulvinar mattis nunc sed blandit libero. Ut diam quam nulla porttitor. Velit dignissim sodales ut eu. Morbi tristique senectus et netus et malesuada fames. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Lacus vestibulum sed arcu non odio euismod lacinia at. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Vitae elementum curabitur vitae nunc sed. Lorem sed risus ultricies tristique nulla aliquet enim tortor at. Nibh cras pulvinar mattis nunc. Massa sed elementum tempus egestas sed sed risus pretium quam. Ac placerat vestibulum lectus mauris ultrices eros. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Ornare aenean euismod elementum nisi. Vivamus at augue eget arcu dictum. Adipiscing tristique risus nec feugiat in fermentum. Ultrices neque ornare aenean euismod elementum nisi. Praesent tristique magna sit amet purus gravida quis blandit.";
    }
    
    if (day === undefined) {
        day = "April 5th 2024";
    }

    if (subject === undefined) {
        subject = "Placeholder Subject";
    }

    return (
        <div>
        <div id="DateDisplay" className=" inline rounded-md p-2 ml-4 px-3 outlook-shadow bg-blue-accent">
            {subject} | {day}
        </div>
        <div id="Summary-Body" className={" m-4 px-8 py-4 rounded-md text-lg outlook-shadow bg-light-accent"}>
            {text}
        </div>
        </div>
    )
}



const Summary = (props: any) => {
    let summaries = props.summaries;
    if (summaries === undefined) {
        summaries = [ {}, {}, {} ]
    }

    return (
    <main>
        <div id="Header" className={" shadow-md text-4xl font-semibold rounded my-8 mx-10"}>
            Here's Your Summary
        </div>
        {summaries.map((summary: any) => (
            <MiniSummary text={summary.text} day={summary.day} subject={summary.subject}/>
        ))}
    </main>
    )
};

export default Summary;