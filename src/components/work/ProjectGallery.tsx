import { Parallax } from "@/components/motion/Parallax";
import { Container } from "@/components/ui/Container";
import type { Project } from "@/types";

interface ProjectGalleryProps {
  project: Project;
}

interface GalleryImage {
  src: string;
  /** 1-based position in the original gallery array, used for the alt text. */
  number: number;
}

interface GalleryGroup {
  kind: "full" | "pair";
  images: GalleryImage[];
}

/** Alternates single full-bleed images with two-up pairs, one image at a time. */
function groupGallery(images: string[]): GalleryGroup[] {
  const numbered = images.map((src, index) => ({ src, number: index + 1 }));
  const groups: GalleryGroup[] = [];
  let index = 0;
  let takeFull = true;

  while (index < numbered.length) {
    if (takeFull) {
      groups.push({ kind: "full", images: numbered.slice(index, index + 1) });
      index += 1;
    } else {
      groups.push({ kind: "pair", images: numbered.slice(index, index + 2) });
      index += 2;
    }
    takeFull = !takeFull;
  }

  return groups;
}

/** Full-bleed images alternating with two-up pairs, each drifting on its own Parallax offset. */
export function ProjectGallery({ project }: ProjectGalleryProps) {
  const groups = groupGallery(project.gallery);

  return (
    <Container className="flex flex-col gap-6 py-section">
      {groups.map((group, groupIndex) =>
        group.kind === "full" ? (
          <Parallax key={groupIndex} offset={50} className="overflow-hidden rounded-xl">
            <img
              src={group.images[0].src}
              alt={`${project.title} — interface detail ${group.images[0].number}`}
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
          </Parallax>
        ) : (
          <div key={groupIndex} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {group.images.map((image, pairIndex) => (
              <Parallax key={image.src} offset={pairIndex === 0 ? 30 : 65} className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={`${project.title} — interface detail ${image.number}`}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </Parallax>
            ))}
          </div>
        ),
      )}
    </Container>
  );
}
