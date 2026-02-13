DANGEROUS = ["DROP", "TRUNCATE"]

def validate_query(query):

    upper = query.upper()

    for word in DANGEROUS:
        if word in upper:
            raise Exception("Dangerous SQL blocked")

    return True
