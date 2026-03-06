export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
            <p className="text-slate-600 dark:text-slate-400">Esta página está em construção.</p>
        </div>
    );
}
