import NewsList from "@/components/news-list";
import Link from "next/link";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

export default function ArchiveYearPage({ params }) {
    const { filter } = params;

    const selectedYear = filter ? filter[0] : undefined;
    const selectedMonth = filter?.[1];

    let news;
    let links = getAvailableNewsYears();

    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear);
    }

    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    }

    let newsContent = <div>{news && news.length > 0 ? <NewsList news={news} /> : <p>No news found.</p>}</div>;

    if (selectedYear && !getAvailableNewsYears().includes(+selectedYear) || (selectedMonth && (!getAvailableNewsMonths(selectedYear).includes(+selectedMonth)))) {
        throw new Error('Invalid year or month provided.');
    }

    return (<>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map((year) => {

                            const href = selectedYear ? `/archive/${selectedYear}/${year}` : `/archive/${year}`;

                            return (
                                <li key={year}>
                                    <Link href={href}>{year}</Link>
                                </li>
                        );
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    );
}
