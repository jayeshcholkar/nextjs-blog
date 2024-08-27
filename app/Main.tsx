import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="my-6 flex flex-col items-center gap-x-12 xl:mb-12 xl:flex-row">
        <div className="mr-8 pt-6">
          <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hi, I’m Jayesh Cholkar
          </h1>
          <h2 className="prose text-lg text-gray-600 dark:text-gray-400">
            {`Welcome to my blog - ${siteMetadata.description}. With expertise in AWS (EC2, CloudFront, S3), MERN stack, and Docker, I build and design exceptional digital experiences. In my free time, I work on `}
            <Link href="/projects">side projects</Link>
            {' and share my journey through '}
            <Link href="/blog">blogging</Link>
            {' Enjoy the read!'}
          </h2>
        </div>
        <div className="custom-input mx-2 my-12 flex w-[300px] items-center justify-center sm:w-[400px] md:w-[550px]">
          <NewsletterForm title="Stay updated, receive the latest post straight to your mailbox" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 pt-20 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recent Blog Posts</h2>
          <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Check out our latest blog posts and stay up-to-date with the latest trends and insights.
          </p>
        </div>
      </div>
      <div className="divide-y divide-gray-200 pt-20 dark:divide-gray-700">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <div
                key={slug}
                className="relative rounded-lg bg-white p-4 shadow-lg dark:bg-[#22272B]"
              >
                <Image
                  src={images[0]}
                  height={100}
                  width={200}
                  quality={90}
                  priority
                  alt={`Image for ${title}`}
                  className="mb-4 h-40 w-full rounded-t-lg object-cover"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <time
                      dateTime={date}
                      className="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>
                  <h2 className="text-lg font-semibold leading-6 tracking-tight">
                    <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                      {title}
                    </Link>
                  </h2>
                  <div className="flex w-full flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <p className="line-clamp-2 text-gray-500 dark:text-gray-400">{summary}</p>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Read "${title}"`}
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex w-full justify-center pt-10 text-center text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
