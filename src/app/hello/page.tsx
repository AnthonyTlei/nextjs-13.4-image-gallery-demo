export default async function HelloPage() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
        <div>This is a Hello Page</div>
    );
}