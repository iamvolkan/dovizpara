import Image from 'next/image';

export default function Logo() {
    return (
        <div className="text-center pt-4 pb-6">
            <Image
                src="/logo.svg"
                alt="DövizPara"
                width={240}
                height={160}
                className="mx-auto"
                priority
            />
        </div>
    );
}
