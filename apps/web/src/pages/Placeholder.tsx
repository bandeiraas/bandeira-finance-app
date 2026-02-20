export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-text-secondary">Esta página está em construção.</p>
        </div>
    );
}
