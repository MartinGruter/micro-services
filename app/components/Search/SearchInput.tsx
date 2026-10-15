import type React from "react";

interface ISearchInputProps {
    searchTerm: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ searchTerm, onChange }: ISearchInputProps) => {
    return (
        <div className="flex-1">
            <label htmlFor="product-search" className="block text-sm">
                Search
            </label>
            <input
                id="product-search"
                type="text"
                value={searchTerm}
                onChange={(e) => onChange(e)}
                placeholder="Search by name or description..."
                className="w-full mt-2 px-4 py-2 rounded-md border border-slate-500 bg-transparent outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-slate-400"
            />
        </div>
    );
}