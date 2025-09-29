import NewsList from "@/components/news-list";
import Link from "next/link";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { Suspense } from "react";

async function FilteredHeader({ year, month, availableYears }) {
    let links = availableYears;

    if (year && !month) {
        links = getAvailableNewsMonths(year);
    }

    if (year && month) {
        links = [];
    }

    return (
        <header id="archive-header">
                <nav>
                    <ul>
                        {links.map((link) => {

                            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

                            return (
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                        );
                        })}
                    </ul>
                </nav>
            </header>
    );
};

async function FilteredNews({ year, month }) {
    let news;

    if (year && !month) {
        news = await getNewsForYear(year);
    } else if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }
    
    let newsContent = <div>{news && news.length > 0 ? <NewsList news={news} /> : <p>Select a year.</p>}</div>;

    return newsContent;
};

export default async function ArchiveYearPage({ params }) {
    const { filter } = params;

    const selectedYear = filter ? filter[0] : undefined;
    const selectedMonth = filter?.[1];

    const availableYears = await getAvailableNewsYears();

    if (selectedYear && !availableYears.includes(selectedYear) || (selectedMonth && (!getAvailableNewsMonths(selectedYear).includes(selectedMonth)))) {
        throw new Error('Invalid year or month provided.');
    }

    return (<>
                <Suspense fallback={<p>Loading news...</p>}>
                    <FilteredHeader year={selectedYear} month={selectedMonth} availableYears={availableYears} />
                    <FilteredNews year={selectedYear} month={selectedMonth} />
                </Suspense>
        </>
    );
}
