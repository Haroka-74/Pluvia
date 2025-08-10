const NoResult = () => {
    return (
        <div className = 'no-result'>
            <img src = '/assets/no-result.svg' className = 'icon' />
            <h3 className = 'title'> Something went wrong. </h3>
            <p> We&apos;re unable to retrieve the weather details. Ensure you&apos;ve entered a valid city name or try again later. </p>
        </div>
    );
};

export default NoResult;