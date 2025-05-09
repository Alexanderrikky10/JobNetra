import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/About',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Card 1 */}
                    <div className="rounded-xl border bg-white p-4 shadow-md dark:bg-neutral-900">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Total Pengguna</h3>
                        <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">1.234</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Aktif bulan ini</p>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-xl border bg-white p-4 shadow-md dark:bg-neutral-900">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Transaksi</h3>
                        <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">327</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Hari ini</p>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-xl border bg-white p-4 shadow-md dark:bg-neutral-900">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Pengunjung</h3>
                        <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">892</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Minggu ini</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
