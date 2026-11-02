
export default function InputError({ message, id }) {
    if (!message) {
        return null;
    }

    return (
        <p id={id} className="err" role="alert">
            {message}
        </p>
    );
}
